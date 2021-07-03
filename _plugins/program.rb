# frozen_string_literal: true

require "net/http"
require "json"
require "nokogiri"

class ProgramDefault < Liquid::Tag
  def render(_context)
    day_l_map_limited = {
	  "Wednesday"  => "szerda",
      "Thursday"  => "csutortok",
      "Friday"    => "pentek",
      "Saturday"  => "szombat",
      "Sunday"    => "vasarnap",
    }

    day_l_map = {
      "Monday"    => "hetfo",
      "Tuesday"   => "kedd",
      "Wednesday" => "szerda",
      "Thursday"  => "csutortok",
      "Friday"    => "pentek",
      "Saturday"  => "szombat",
      "Sunday"    => "vasarnap",
    }

    first = "tab-pane row active"

    data = JSON.parse File.read "_program.json"
    byday = {}
    day_l_map_limited.each do |d, _e|
      byday[d] = {
        :events    => [],
        :locations => [],
        :partners  => [],
      }
    end
    data.each do |e|
      t = Time.parse(e["start"])
      day = t.to_date
      day -= 1 if t.strftime("%H").to_i < 5
      day = day.strftime("%A") # TODO: 4:00
      byday[day][:events] << e
      byday[day][:locations] << e["location"] unless byday[day][:locations].include? e["location"]
      byday[day][:partners] << e["partner"] unless byday[day][:partners].include? e["partner"]
    end
    @html = Nokogiri::HTML::DocumentFragment.parse ""
    Nokogiri::HTML::Builder.with(@html) do |html|
      html.div(:class => "tab-content program-matrix program") do
        byday.each do |d, l|
          html.div(:class => first, :id => day_l_map_limited[d]) do
            first = "tab-pane row"
            html.div(:class => "col-md-2 visible-md visible-lg") do
              html.ul(:class => "nav nav-pills nav-stacked filter") do
                html.li(:class => "active alltoggle") { html.a(:href => "#") { html.text "Mutasd mind!" } }
                html.p(:class => "filter-header", :style => (l[:locations].empty? && l[:events].empty? ? "display:none;" : "").to_s) { html.text "Helyszinek:" }
                i = 0
                l[:locations].each do |loc|
                  loc ? html.li(:class => "active location-filter", "data-toggle" => "#{day_l_map_limited[d]}_#{i}") { html.a(:href => "#") { html.text loc } } : nil
                  i += 1
                end
                l[:locations].include?(nil) ? html.li(:class => "active location-filter", "data-toggle" => "#{day_l_map_limited[d]}_#{l[:locations].find_index(nil)}") { html.a(:href => "#") { html.text "Egyéb" } } : nil

                html.p(:class => "filter-header", :style => (l[:partners].empty? && l[:events].empty? ? "display:none;" : "").to_s) { html.text "Szervezők:" }
                i = 0
                l[:partners].each do |par|
                  par ? html.li(:class => "active partner-filter", "data-toggle" => "#{day_l_map_limited[d]}_p_#{i}") { html.a(:href => "#") { html.text par } } : nil
                  i += 1
                end
                l[:partners].include?(nil) ? html.li(:class => "active partner-filter", "data-toggle" => "#{day_l_map_limited[d]}_p_#{l[:partners].find_index(nil)}") { html.a(:href => "#") { html.text "Egyéb" } } : nil
              end
            end
            html.div(:class => "col-md-10 programlist") do
              l[:events].each do |e|
                e["start"] = Time.parse e["start"]
                e["end"] = Time.parse e["end"]
                location_class = day_l_map_limited[d] + "_" + l[:locations].index(e["location"]).to_s
                partner_class = day_l_map_limited[d] + "_p_" + l[:partners].index(e["partner"]).to_s
                html.div(:class => "program-pont row two_active " + location_class + " " + partner_class) do
                  html.div(:class => "row") do
                    html.div(:class => "col-md-10") do
                      html.div(:class => "col-md-2 meta") do
                        if e["end"] - e["start"] < 180
                          html.div(:class => "idopont") { html.text e["start"].strftime("%k:%M") }
                        else
                          html.div(:class => "idopont") { html.text "#{e["start"].strftime("%k:%M")} - #{e["end"].strftime("%k:%M")}" }
                        end
                        html.div(:class => "helyszin") { html.text e["location"] }
                        html.div(:class => "szervezo") { html.text e["partner"] }
                      end
                      html.div(:class => "col-md-10") do
                        html.h3 { html.text e["name"] }
                        html.p { html << e["description"] }
                      end
                    end
                    if e["logo"]
                      html.div(:class => "col-md-2 visible-lg visible-md") do
                        html.img(:src => e["logo"], :class => "img-responsive", :alt => (e["partner"]).to_s)
                      end
                    end
                  end
                end
              end
              html.h3(:style => "margin-top:15px") { html.text "Még nincs erra a napra program!" } if l[:events].empty?
            end
          end
        end
      end
    end
    @html.to_html
  end
  Liquid::Template.register_tag("default_render", self)
end

class ProgramFull < Liquid::Tag
  def render(_context)
    day_l_map = {
      "Monday"    => "Hétfő",
      "Tuesday"   => "Kedd",
      "Wednesday" => "Szerda",
      "Thursday"  => "Csütörtök",
      "Friday"    => "Péntek",
      "Saturday"  => "Szombat",
      "Sunday"    => "Vasárnap",
    }

    data = JSON.parse File.read "_program.json"
    byday = {}
    data.each do |e|
      t = Time.parse(e["start"])
      day = t.to_date
      day -= 1 if t.strftime("%H").to_i < 5
      day = day.strftime("%A") # TODO: 4:00
      if byday[day].nil?
        byday[day] = {
          :events    => [],
          :locations => [],
          :partners  => [],
        }
      end
      byday[day][:events] << e
      byday[day][:locations] << e["location"] unless byday[day][:locations].include? e["location"]
      byday[day][:partners] << e["partner"] unless byday[day][:partners].include? e["partner"]
    end
    @html = Nokogiri::HTML::DocumentFragment.parse ""
    Nokogiri::HTML::Builder.with(@html) do |html|
      byday.each do |d, l|
        html.div(:class => "program-day-wrap program-day-" + d) do
          html.h3 { html.text day_l_map[d] }
          l[:events].each do |e|
            html.div(:class => "program-wrap") do
              e["start"] = Time.parse e["start"]
              e["end"] = Time.parse e["end"]
              html.div(:class => "program-start") { html.text e["start"].strftime("%k:%M").to_s }
              html.div(:class => "program-location") { html.text (e["location"]).to_s }
              html.div(:class => "program-title") { html.text (e["name"]).to_s }
              html.div(:class => "program-description") { html.text (e["description"]).to_s }
            end
          end
        end
      end
    end
    @html.to_html
  end
  Liquid::Template.register_tag("full_render", self)
end

class ProgramTable < Liquid::Tag
  def render(_context)
    day_l_map = {
      "Monday"    => "Hétfő",
      "Tuesday"   => "Kedd",
      "Wednesday" => "Szerda",
      "Thursday"  => "Csütörtök",
      "Friday"    => "Péntek",
      "Saturday"  => "Szombat",
      "Sunday"    => "Vasárnap",
    }

    data = JSON.parse File.read "_program.json"
    byday = {}
    data.each do |e|
      t = Time.parse(e["start"])
      day = t.to_date
      day -= 1 if t.strftime("%H").to_i < 5
      day = day.strftime("%A") # TODO: 4:00
      if byday[day].nil?
        byday[day] = {
          :events    => [],
          :locations => [],
          :partners  => [],
        }
      end
      byday[day][:events] << e
      byday[day][:locations] << e["location"] unless byday[day][:locations].include? e["location"]
      byday[day][:partners] << e["partner"] unless byday[day][:partners].include? e["partner"]
    end
    @html = Nokogiri::HTML::DocumentFragment.parse ""
    Nokogiri::HTML::Builder.with(@html) do |html|
      byday.each do |d, l|
        html.div(:class => "program-day-wrap") do
          html.h3 { html.text day_l_map[d] }
          html.table(:class => "program-day-wrap") do
            l[:events].each do |e|
              html.tr(:class => "program-day-wrap") do
                e["start"] = Time.parse e["start"]
                e["end"] = Time.parse e["end"]
                html.td(:class => "program-start") { html.text e["start"].strftime("%k:%M").to_s }
                html.td(:class => "program-location") { html.text (e["location"]).to_s }
                html.td(:class => "program-title") { html.text (e["name"]).to_s }
                html.td(:class => "program-description") { html.text (e["description"]).to_s }
              end
            end
          end
        end
      end
    end
    @html.to_html
  end
  Liquid::Template.register_tag("table_render", self)
end

class ProgramList < Liquid::Tag
  def render(_context)
    day_l_map = {
      "Monday"    => "Hétfő",
      "Tuesday"   => "Kedd",
      "Wednesday" => "Szerda",
      "Thursday"  => "Csütörtök",
      "Friday"    => "Péntek",
      "Saturday"  => "Szombat",
      "Sunday"    => "Vasárnap",
    }

    data = JSON.parse File.read "_program.json"
    byday = {}
    data.each do |e|
      t = Time.parse(e["start"])
      day = t.to_date
      day = day.strftime("%A")
      if byday[day].nil?
        byday[day] = {
          :events    => [],
          :locations => [],
          :partners  => [],
        }
      end
      byday[day][:events] << e
      byday[day][:locations] << e["location"] unless byday[day][:locations].include? e["location"]
      byday[day][:partners] << e["partner"] unless byday[day][:partners].include? e["partner"]
    end
    @html = Nokogiri::HTML::DocumentFragment.parse ""
    Nokogiri::HTML::Builder.with(@html) do |html|
      html.div(:class => "program-day-wrap") do
        html.table(:class => "program-day-wrap") do
          byday.each do |_d, l|
            l[:events].each do |e|
              html.tr(:class => "program-day-wrap") do
                e["start"] = Time.parse e["start"]
                e["end"] = Time.parse e["end"]
                html.td(:class => "program-start") { html.text "#{e["start"].strftime("%Y-%m-%d %H:%M")} - #{e["end"].strftime("%Y-%m-%d %H:%M ")} " }
                html.td(:class => "program-location") { html.text (e["location"]).to_s }
                html.td(:class => "program-title") { html.text (e["name"]).to_s }
              end
            end
          end
        end
      end
    end
    @html.to_html
  end
  Liquid::Template.register_tag("list_render", self)
end
