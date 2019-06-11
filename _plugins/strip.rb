# frozen_string_literal: true

require "nokogiri"
module Jekyll
  module StripFilter
    def strip(input)
      input.gsub %r!\{%[^%]*%\}!, ""
      input = Nokogiri::HTML(input).text
    end
  end
end

Liquid::Template.register_filter(Jekyll::StripFilter)
