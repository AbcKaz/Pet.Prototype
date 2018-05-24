var NotificationHelper = new function () {


    this.NotificationsCount= function () {
        if ($(".notifications-count").length > 0) {
            $.ajax({
            	 url: "/" + languageUI + "/Cabinet/LastNotificationsCount"
            }).done(function (output) {
                $(".notifications-not-read").html(output.countNotReadNotifications);
                $(".notifications-all").html(output.countAllNotifications);
            });
        }
    }
}