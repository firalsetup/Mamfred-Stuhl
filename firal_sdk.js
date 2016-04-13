(function(window, document, undefined) {"use strict";
  var Firal = {};

  if(window.Firal) {
    return;
  }

  if(window.Firal_Setup) {
    var debug = Firal_Setup.debug || false;
    var program_id = Firal_Setup.program_id || false;
    var readkey = Firal_Setup.read_key || false;
  }

  if(!(program_id && readkey)) {
    console.log('[Firal] Firal API not initialized! Supply program_id and readkey');
    return;
  }

  function loadScript(url, callback) {
    var scriptTag = document.createElement('script');
    scriptTag.setAttribute("type", "text/javascript");
    scriptTag.setAttribute("src", url);
    scriptTag.async = true;

    if (typeof callback !== undefined) {
      if (scriptTag.readyState) {
        scriptTag.onreadystatechange = function() {
          if (this.readyState == 'complete' || this.readyState == 'loaded') {
            callback();
          }
        }
      } else {
        scriptTag.onload = callback;
      }
    }
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(scriptTag);
  }

  loadScript("https://code.jquery.com/jquery-1.12.0.min.js", function(Firal) {
    Firal.$ = Firal.jQuery = window.jQuery.noConflict(true);
  });

  Firal.getVoucher = function(callback) {
    var api_host = 'https://www.paywithapost.de';

    if(debug === true) {
      api_host = 'http://localhost:3000';
    }

    var endpoint = '/api/v1/voucher_code';
    var pwat_uid = getParameterByName('pwat_uid');
    var ref_program = program_id; 
    var api_url = api_host + endpoint + '?pwat_uid=' + pwat_uid + '&ref_program=' + ref_program;

    $.getJSON(
        api_url, 
        function(data) {
          var voucher = data.voucher_code;
          callback(voucher);
        }
        );
  }

  function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  Firal.init = function(callback) {
    if(callback) {
      callback();
    }
  };

  window.Firal = Firal;
}(window, document, undefined));
