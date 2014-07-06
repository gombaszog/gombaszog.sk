require 'net/http'
require 'json'

class ProgramTag < Liquid::Tag

  def render(context)
    day_l_map = {
      "Monday"    => "Hétfő",
      "Tuesday"   => "Kedd",
      "Wednesday" => "Szerda",
      "Thursday"  => "Csütörtök",
      "Friday"    => "Péntek",
      "Saturday"  => "Szombat",
      "Sunday"    => "Vasárnap",
    }

    res = Net::HTTP.get_response(URI.parse("https://www.gombaszog.sk/api/program"))
    if res.is_a?(Net::HTTPSuccess)
      data = JSON.parse(res.body)
    else
      raise "Gombafelho API: failed to get program"
    end

    locations = {}
    data['locations'].each do |d|
      locations[d['id']] = d['name']
    end

    partners = {}
    data['partners'].each do |d|
      partners[d['id']] = d['name']
    end

    datab = {}
    data['events'].each do |d|
      # d keys: created_at management end description visible partner_id image_id updated_at start festival_id shortname location_id id name
      start_date = Time.parse(d['start']).strftime('%Y-%m-%d')
      if d['visible']
        if not datab.has_key? start_date
          datab[start_date] = []
        end
        datab[start_date].push(d)
      end
    end

    str = '<div class="program">';
    datab.sort.map do |k, v|
      str += '<div class="program-nap">'
      str += '<div class="program-datum">'+"#{day_l_map[Time.parse(k).strftime('%A')]}"+'</div>'
      str += '<div class="program-tabla">'
      v.sort_by{ |bb| bb['start']+bb['end'] }.each do |d|
        str += '<div class="program-sor">'
        str += '<div class="program-ido">' + "#{Time.parse(d['start']).strftime('%k:%M')} - #{Time.parse(d['end']).strftime('%k:%M')}</div>"
        str += '<div class="program-nev">' + "#{d['name']}</div>"
        str += '<div class="program-helyszin">' + "#{locations[d['location_id']]}</div>"
        str += '</div>'
      end
      str += "</div>"
      str += "</div>"
    end
    str += '</div>';

    str
  end

  Liquid::Template.register_tag('dyn_program', self)

end
