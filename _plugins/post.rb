# frozen_string_literal: true

module Jekyll
  class Post
    def initialize(site, source, dir, name)
      @site = site
      @dir = dir
      @base = containing_dir(source, dir)
      @name = name

      self.categories = dir.downcase.split("/").reject(&:empty?)
      process(name)
      read_yaml(@base, name)

      if data.key?("date")
        self.date = Time.parse(data["date"].to_s).localtime # localtime for timezone fix
      end

      # self.published = self.published?

      populate_categories
      populate_tags
    end
  end
end
