$(document).ready(function (){
    var base_url=window.location.origin;

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="_csrf"]').attr('content')
        }
    });

});

//////////////////////Block Ui ////////////////////////////////////////
function block_ui(){
    $.blockUI({
        message: '<div class="spinner-grow text-primary" role="status"><span class="sr-only">Loading...</span></div>'+
            '<div class="spinner-grow text-secondary" role="status"><span class="sr-only">Loading...</span></div>'+
            '<div class="spinner-grow text-success" role="status"><span class="sr-only">Loading...</span></div>',
        css: {border: 'none', backgroundColor:'transparent'},
        baseZ: 4000,
    });
}

/////////////////////////////// Toastr functions ////////////////////////////
function success(message='Operation was successful.'){
    toastr.info(message,'Success',{
        "positionClass": "toast-top-right",
        timeOut: 5000,
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
        "tapToDismiss": false
    });
}

function error(message='Something went wrong.'){
    toastr.error(message, 'Error', {
        "positionClass": "toast-top-right",
        timeOut: 5000,
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
        "tapToDismiss": false
    });
}

////////////////////// Create form ////////////////////////////////////
$(document).on('submit', '.create_form', function (e) {
    e.preventDefault();
    var url = $(this).attr('action');
    var method = $(this).attr('method');

    var data = $(this)[0];
    var formData = new FormData(data);
    if (method) {
        formData.append('_method', method);
    }

    $('span.input-error').remove();
    block_ui();

    $.ajax({
        type: 'post',
        url: url,
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            console.log(data);
            if (data.status) {
                //$(".datatable").DataTable().ajax.reload(null, false);
                //$('.custom-modal').modal('hide');
                $('.create_form')[0].reset();
                $.unblockUI();
                success(data.message);
            }
            else {
                $.unblockUI();
                error(data.message);
            }
        },
        error: function (response, exception) {
            var errors = JSON.parse(response.responseText).errors.details;
            //console.log(errors)
            $.each(errors, function (i, error_arr) {
                //console.log(error_arr.context.label)
                //console.log(error_arr.message)
                if ($('span.text-danger.' + error_arr.context.label).length == 0) {
                    $('.form-control[name="' + error_arr.context.label + '"]').after('<span class="input-error ' + error_arr.context.label + ' text-strong text-danger">' + error_arr.message + '</span>');
                }
            });
            $.unblockUI();
            error("Please resolve following errors.");
        },
    });
});

//////////////////////////////delete function ////////////////////////
function delete_record(url){
    $.confirm({
        title: 'Are you Sure?',
        content: 'You Really want to delete this record.',
        type: 'red',
        buttons: {
            ok: {
                text: "Yes!",
                btnClass: 'btn-primary',
                keys: ['enter'],
                action: function(){
                    $.blockUI();

                    $.ajax({
                        url: url,
                        type: 'get',
                        success: function (data) {
                            pageloading(0);
                            $.unblockUI();
                            $.alert(data.message);
                        },
                        error: function (data) {
                            $.unblockUI();
                            $.alert(data.message);
                        },
                    });
                }
            },
            cancel: function(){
                $.alert('Record is safe!');
            }
        }
    });
}

