require 'i18n'

LOCALE = ENV['LOCALE'] || :en

# Create folder "_locales" and put some locale file from https://github.com/svenfuchs/rails-i18n/tree/master/rails/locale
module Jekyll
  module I18nFilter
    def t(input)
      load_translations
      I18n.t input
    end

    def localize(input, format=nil)
      format = (format =~ /^:(\w+)/) ? $1.to_sym : format
      I18n.l input, :format => format
    end

    def load_translations
      if I18n.backend.send(:translations).empty?
        I18n.backend.load_translations Dir[File.join(File.dirname(__FILE__),'../_locales/*.yml')]
        I18n.locale = LOCALE
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::I18nFilter)
