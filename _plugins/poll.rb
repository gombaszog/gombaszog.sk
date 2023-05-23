

module Jekyll
  class PollPageGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.key? 'poll'
        options = {
            1=> "Analóg Balaton",
            2=> "AWS",
            3=> "Azahriah",
            4=> "Belga",
            5=> "Beton.hofi",
            6=> "Blahalouisiana",
            7=> "Bohemian Betyars",
            8=> "Buy her Sugar",
            9=> "Damara",
            10=> "Deva",
            11=> "Dondi Duo",
            12=> "Endorfin",
            13=> "Exit",
            14=> "Flanger Kids",
            15=> "GHP",
            16=> "Hiperkarma",
            17=> "HoryZone",
            18=> "Ivan and the parazol",
            19=> "Jakuza Ritual",
            20=> "Jóvilágvan",
            21=> "Karmen",
            22=> "Ketten",
            23=> "Kingfishers",
            24=> "Korai",
            25=> "Locomotiv Revival Band",
            26=> "No para",
            27=> "Ossian",
            28=> "Paddy and the Rats",
            29=> "Pusztaszer",
            30=> "Retrock",
            31=> "Rómeó vérzik",
            32=> "Rúzsa Magdi",
            33=> "Shallov.",
            34=> "Sin Seekas",
            35=> "SunCity Brass",
            36=> "The Beat This",
            37=> "Trapéz",
            38=> "Góbé",
            39=> "Pósfa",
            40=> "Korpás Éva",
            41=> "Fanfara Complexa",
            42=> "Romengo együttes",
            43=> "Sajó Banda",
            44=> "Herczku Ágnes",
          }
        dir = "poll/result"
        options.each_key do |result1|
          site.pages << CategoryPage.new(site, site.source, File.join(dir, result1.to_s), options[result1])
          options.each_key do |result2|
            if result2 > result1
              site.pages << CategoryPage.new(site, site.source, File.join(dir, result1.to_s + "-" + result2.to_s), options[result1] + ", " + options[result2])
              options.each_key do |result3|
                if result3 > result2
                  site.pages << CategoryPage.new(site, site.source, File.join(dir, result1.to_s + "-" + result2.to_s + "-" + result3.to_s), options[result1] + ", " + options[result2] + ", " + options[result3])
                end
              end
            end
          end
        end
      end
    end
  end

  # A Page subclass used in the `CategoryPageGenerator`
  class CategoryPage < Page
    def initialize(site, base, dir, poll)
      @site = site
      @base = base
      @dir  = dir
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'poll.html')

      self.data['result'] = poll
    end
  end
end
