# frozen_string_literal: true

require "erb"

class FbLike < Liquid::Tag
  def render(context)
    %(<iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.gombaszog.sk#{ERB::Util.url_encode context.environments.first["page"]["url"]}&amp;width=100&amp;layout=button_count&amp;action=like&amp;show_faces=true&amp;share=true&amp;height=21&amp;appId=267323596708516" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100%; height:21px;" allowTransparency="true"></iframe>)
  end

  Liquid::Template.register_tag("fb_like", self)
end
