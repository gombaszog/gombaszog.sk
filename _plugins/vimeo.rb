# frozen_string_literal: true

class Vimeo < Liquid::Tag
  @@width = 500
  @@height = 281

  def initialize(name, id, tokens)
    super
    @id = id
  end

  def render(_context)
    %(<iframe width="#{@@width}" height="#{@@height}" src="http://player.vimeo.com/video/#{@id}" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>)
  end

  Liquid::Template.register_tag("vimeo", self)
end
