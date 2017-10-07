/**
 * Criar novos BBCodes ao SCEditor.
 * @author Luiz
 */
(function ($) {
  'use strict';

  var config = [
    {
      name: 'success',
      icon: 'https://i.imgur.com/neqs1Di.png',
      onlyMod: true
    }, {
      name: 'danger',
      icon: 'https://i.imgur.com/vAdDXve.png',
      onlyMod: true
    }, {
      name: 'info',
      icon: 'https://i.imgur.com/5ZBYf6X.png',
      onlyMod: true
    }
  ];

  window.FA = window.FA || {};
  FA.BBCodes = FA.BBCodes || {};

  var BBCodes;
  FA.BBCodes = BBCodes = function (config) {
    this.config = config || {};
  };

  BBCodes.prototype.init = function () {
    var self = this;

    if (self.config.onlyMod) {
      if (
        _userdata.user_level !== 1 &&
        _userdata.user_level !== 2
      ) {
        return;
      }
    }

    self.runSceditor();
    self.replaceText();
  };

  BBCodes.prototype.runSceditor = function () {
    var self = this;

    if (!$.sceditor) {
      return;
    }

    var $textarea = $('#text_editor_textarea');
    var $sceditor = $textarea.sceditor('instance');

    if (!$('.fa-mod-buttons').length) {
      var $lastGroup = $('.sceditor-group').last();

      $lastGroup
        .clone()
          .attr('class', 'sceditor-group fa-mod-buttons')
          .html('')
            .insertAfter($lastGroup)
      ;
    }

    $('<a>', {
      'class': 'sceditor-button fa-mod-button fa-mod-button-' + self.config.name,
      'href' : 'javascript:;',
      'html' : $('<div>', { 'style': 'background-image: url(' + self.config.icon + ');' }).prop('outerHTML')
    })
      .on('click', function (event) {
        event.preventDefault();

        $sceditor.insert('[' + self.config.name + ']', '[/' + self.config.name + ']');
      })
        .appendTo('.fa-mod-buttons')
    ;
  };

  BBCodes.prototype.replaceText = function () {
    var self = this;

    var regex = new RegExp ('\[' + self.config.name + '\]([^\[]+)\[\/' + self.config.name + '\]', 'gi');

    var selectors = [
      '.entry-content > div',
      '.content > div'
    ];

    $(selectors.join(', ')).each(function () {
      var $this = $(this);
      var $html = $this.html();

      $this.html($html.replace(regex, function(text, match) {
        return $('<div>', {
          'class': 'fa-mod-content fa-mod-' + self.config.name,
          'text' : match
        }).prop('outerHTML')
      }));
    });
  };

  $(function () {
    $.each(config, function (index, bbcode) {
      (new BBCodes(bbcode)).init();
    });
  });
}(jQuery));
