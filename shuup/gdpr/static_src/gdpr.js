/**
 * This file is part of Shuup.
 *
 * Copyright (c) 2012-2018, Shuup Inc. All rights reserved.
 *
 * This source code is licensed under the OSL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

(() => {

    $(document).ready(function() {
        if(navigator.userAgent.match(/Windows Phone/i)){
            $(".gdpr-consent-warn-content").addClass("windows-phone");
        }

    });

    $("#privacy-preferences-btn").click(() => {
        $(".gdpr-consent-preferences").addClass("visible");
        $("body").addClass("body-noscroll");
    });

    $(".gdpr-consent-preferences .btn-close").click(() => {
        $(".gdpr-consent-preferences").removeClass("visible");
        $("body").removeClass("body-noscroll");
    });

    $(".consent-option-item").click((e) => {
        $(".gdpr-consent-preference-panel").removeClass("active");
        $(".consent-option-item").removeClass("active");
        $(e.target).addClass("active");
        const data = $(e.target).data();
        $("#consent_" + data.target).addClass("active");
    });

    function saveConsent() {
        data = $("#consent-form").serialize();
        var request = $.ajax({
            url: $("#consent-form").attr("action"),
            type: 'POST',
            data: data,
            success: function() {
                var consent_bar = document.getElementsByClassName("gdpr-consent-warn-bar")[0];
                var privacy_pref = document.getElementsByClassName("gdpr-consent-preferences")[0];
                consent_bar.outerHTML = "";
                privacy_pref.outerHTML = ""; // Remove GDPR divs and their content upon successful completion
                $("body").removeClass("body-noscroll");
            }
        });

    }

    $("#btn-save-preferences").click(() => {
        saveConsent();
    });

    $("#agree-btn").click(() => {
        saveConsent();
    });
})();
