$(document).ready(() => {

    $('form').on('submit', (event) => {
        event.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/uploadJSON',
            success: postData,
            data: new FormData($('form')[0]),
            cache: false,
            contentType: false,
            processData: false,

            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                //Handles progress of upload
                if(myXhr.upload) {
                    myXhr.upload.addEventListener('progress', function (e) {
                        if (e.lengthComputable) {
                            $('progress').attr({
                                value: e.loaded,
                                max: e.total,
                            });
                        }
                    }, false);
                }
                return myXhr;
            }
        });
    });

    //Get the data and put it somewhere in the DOM
    //Will likely clear and populate a specific DIV
    const postData = (data) => {
        $('#CSVoutput').empty()
        $('#CSVoutput').text(data);
    }

    $('#download').click(() => {
        $('<a />').attr({
            download: 'export.csv',
            href: "data:text/html," + $('#CSVoutput').text()
        })[0].click()
    });
});