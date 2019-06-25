$(document).ready(() => {

    $('form').on('submit', (event) => {
        event.preventDefault();
        console.log('Submit button no worky')
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
        $('.CSVoutput').empty()
        $('.CSVoutput').text(data);
        console.log(data);
    }
});