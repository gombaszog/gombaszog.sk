# frozen_string_literal: true

module Jekyll
  module Localize
    def localize(input)
      map = {
        "January"   => "január",
        "February"  => "február",
        "March"     => "március",
        "April"     => "április",
        "May"       => "május",
        "June"      => "június",
        "July"      => "július",
        "August"    => "augusztus",
        "September" => "szeptember",
        "October"   => "október",
        "November"  => "november",
        "December"  => "december",
        "Jan"       => "január",
        "Feb"       => "február",
        "Mar"       => "március",
        "Apr"       => "április",
        "May"       => "május",
        "Jun"       => "június",
        "Jul"       => "július",
        "Aug"       => "aug.",
        "Sep"       => "szept.",
        "Oct"       => "október",
        "Nov"       => "nov.",
        "Dec"       => "dec.",
      }
      re = Regexp.new(map.keys.map { |x| Regexp.escape(x) }.join("|"))
      input.gsub(re, map)
    end
  end
end

Liquid::Template.register_filter(Jekyll::Localize)
