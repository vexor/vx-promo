module TextFilter
  def typo_text(text)
    # glue by &nbsp; 1-2-letters words with next words
    text.gsub(/\b((and|for|with|then|[^\s\p{P}]{1,2})\p{P}?)\s+(?=[^\s<>]+)/i, '\1&nbsp;')
  end
end

Liquid::Template.register_filter(TextFilter)
