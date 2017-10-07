/*globals jQuery, FA*/
/**
 * Alterar o ícone do tópico com AJAX.
 *
 * @author Luiz
 * @version {alpha} 1.0
 * @licence MIT
 */

(function ($) {
  'use strict';

  var config = [
    { name: 'Astúcia', id  : 6, background: '#8b5' },
    { name: 'Em Curso', id  : 1, background: '#ecb942' },
  ];

  window.FA = window.FA || {};
  FA.Topic = FA.Topic || {};

  var MarkIcon;
  FA.Topic.MarkIcon = MarkIcon = function (config) {
    var self = this;

    self.userConfig = config;
    self.defaults = { name: undefined, id: undefined, background: undefined };
    self.config = $.extend({}, self.defaults, self.userConfig);

    $.each(self.config, function (key, value) {
      if (key === undefined) {
        throw new Error ('Não foi especificado um: ' + key + ' para o script de botões.');
      }
    });
  };

  MarkIcon.prototype.init = function () {
    var self = this;

    var $post = $('.post:first');
    var $link = $post.find('a[href$="mode=editpost"]');

    if (!$link.length) {
      return;
    }

    self.messageLink = $link.attr('href');

    self.button = $('<button>', {
      'class'  : 'fa-mark-icon-button',
      'data-id': self.config.id,
      'text'   : self.config.name
    });

    $(self.button)
      .css('background-color', self.config.background)
      .on('click', function (event) {
        event.preventDefault();

        self.runAjax();
      })
      .insertBefore($post)
    ;
  };

  MarkIcon.prototype.runAjax = function () {
    var self = this;

    self.changeText('<i class="fa fa-refresh fa-spin"></i> Marcando...');

    $.get(self.messageLink)
      .done(function (context) {
        var $form = $('form[action="/post"]', context);

        $form.find('input[name="post_icon"]').val(self.config.id);
        $form.find('input[name="edit_reason"]').remove();

        var encode = document.charset.toLowerCase() === 'utf-8'
          ? window.encodeURIComponent
          : window.escape
        ;

        var data = {
          subject           : $form.find('[name="subject"]').val(),
          post_icon         : self.config.id,
          message           : $form.find('[name="message"]').val(),
          mode              : $form.find('[name="mode"]').val(),
          p                 : $form.find('[name="p"]').val(),
          modif_topic_title : $form.find('[name="modif_topic_title"]').val(),
          topictype         : $form.find('[name="topictype"]').val(),
          poll_title        : $form.find('[name="poll_title"]').val(),
          poll_option_text  : $form.find('[name="poll_option_text"]').val(),
          poll_length       : $form.find('[name="poll_length"]').val(),
          poll_multiple     : $form.find('[name="poll_multiple"]').val(),
          poll_cancel_vote  : $form.find('[name="poll_cancel_vote"]').val(),
          'auth[]'          : $form.find('[name="auth[]"]').val(),
          post              : 1
        };

        var encoded = $.map(data, function (value, key) {
          return key + '=' + encode(value);
        }).join('&');

        $.post(self.messageLink, encoded)
          .done(function () {
            self.changeText('<i class="fa fa-check"></i> Marcado!');
          })
          .fail(function () {
            alert([
              '[#2] Houve um erro ao marcar o tópico como "' + self.config.name + '".',
              'Por favor, contate o suporte técnico.'
            ].join('\n'));
          })
        ;
      })
      .fail(function () {
        alert([
          '[#1] Houve um erro ao marcar o tópico como "' + self.config.name + '".',
          'Por favor, contate o suporte técnico.'
        ].join('\n'));
      })
    ;
  };

  MarkIcon.prototype.changeText = function (text) {
    var self = this;

    $(self.button)
      .html(text)
    ;
  };

  $(function () {
    $.each(config, function () {
      var self = this;

      (new FA.Topic.MarkIcon(self)).init();
    });
  });
}(jQuery));
