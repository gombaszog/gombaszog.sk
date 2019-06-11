# frozen_string_literal: true

class YouTube < Liquid::Tag
  Syntax = %r!^\s*([^\s]+)(\s+(\d+)\s+(\d+)\s*)?!

  def initialize(tagName, markup, tokens)
    super

    if markup =~ Syntax
      @id = Regexp.last_match(1)

      if Regexp.last_match(2).nil?
        @width = 560
        @height = 420
      else
        @width = Regexp.last_match(2).to_i
        @height = Regexp.last_match(3).to_i
      end
    else
      raise "No YouTube ID provided in the \"youtube\" tag"
    end
  end

  def render(_context)
    # "<iframe width=\"#{@width}\" height=\"#{@height}\" src=\"http://www.youtube.com/embed/#{@id}\" frameborder=\"0\"allowfullscreen></iframe>"
    "<div class=\"videoWrapper\"><iframe frameborder=\"0\" width=\"#{@width}\" height=\"#{@height}\" src=\"//www.youtube.com/embed/#{@id}?color=white&theme=light\"></iframe></div>"
  end

  Liquid::Template.register_tag "youtube", self
end
