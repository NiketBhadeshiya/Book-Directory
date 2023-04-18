

$('#add_book').submit(function (event) {
    alert("Data Inserted Successfully");
})


// ------------ register form -----------
$('#register_form_submit').submit(function (event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function (n, i) {
        data[n['name']] = n['value']
    })

    if (data['password'] == data['cpassword']) {
        // alert("data is acceptable..!!");

        var request = {
            "url": "http://localhost:6060/api/users",
            "method": "POST",
            "data": data
        }

        $.ajax(request).done(function (res) {
            alert("User Registered successfully.. Please Verify Your Mail..!!");
            location.reload();
        })

    } else {
        alert("Password can not mach..!!");
    }
})



// ---------   login form ------------
// $('#login_form_submit').submit(function(event){
//     event.preventDefault();

//     var unindexed_array = $(this).serializeArray();
//     var data = {}

//     $.map(unindexed_array, function(n, i) {
//         data[n['name']] = n['value']
//     });

//     var request = {
//         "url" : "http://localhost:6060/api/users",
//         "method" : "GET",
//         "data" : data
//     }

//     $.ajax(request).done(function(res) {
//         if(!res){ 
//             alert("Invalid data Credential..!!");
//             location.reload();
//         } else {
//             alert(`welcome ${res[0].userName}`);
//             // location.pathname = '/admin';
//             window.location.assign('http://localhost:6060/admin')
//         }

//     }).fail(function (jqXHR, textStatus){
//         alert("Invalid Credential..!!");
//     })
// })



// -----------update book -------
$('#update_book').submit(function (event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function (n, i) {
        data[n['name']] = n['value'];
    })

    var request = {
        "url": `http://localhost:6060/api/books/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function (res) {
        alert("data updated successfully!!");
    })
})


// ---------------- update author -------------
$('#update_author').submit(function (event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var authordata = {}

    $.map(unindexed_array, function (n, i) {
        authordata[n['name']] = n['value'];
    })

    var request = {
        "url": `http://localhost:6060/api/authors/${authordata.id}`,
        "method": "PUT",
        "data": authordata
    }

    $.ajax(request).done(function (res) {
        alert("data updated successfully..!!");
    })
});


$('#update-user-profile').submit(function (event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var userdata = {}

    $.map(unindexed_array, function (n, i) {
        userdata[n['name']] = n['value'];
    })

    var request = {
        "url": `http://localhost:6060/api/users/${userdata.id}`,
        "method": "PUT",
        "data": userdata
    }

    $.ajax(request).done(function (res) {
        alert("Your data updated Successfully..");
        location.reload();
    })
})



// if(window.location.pathname == '/user/myCart/:id'){
$ondeletecart = $('table tr td a.remove-cart-item');
$ondeletecart.click(function () {
    var bookid = $(this).attr("data-id");
    var userid = $(this).attr("user-id");

    var request = {
        "url": `http://localhost:6060/api/users/cart?bookId=${bookid}&userId=${userid}`,
        "method": "DELETE"
    }

    if (confirm("Do you really want to delete this cart item ?")) {
        $.ajax(request).done(function (res) {
            alert("Item deleted successfullly...");
            location.reload();
        })
    }
})
// }



if (window.location.pathname == '/bookView') {
    $oncart = $("a.add-to-cart");
    $oncart.click(function () {
        var bookid = $(this).attr("data-id");
        var userid = $(this).attr("user-id");

        var request = {
            "url": `http://localhost:6060/api/users/cart?bookId=${bookid}&userId=${userid}`,
            "method": "POST"
        }


        $.ajax(request).done(function (res) {
            alert("Added to cart..");
        });
    })
}


// if(window.location.pathname == "/"){
$onAddWishlist = $("a.add-to-wishlist");
$onAddWishlist.click(function () {
    var bookid = $(this).attr("data-id");
    var userid = $(this).attr("user-id");

    var request = {
        "url": `http://localhost:6060/api/users/wishlist?bookId=${bookid}&userId=${userid}`,
        "method": "POST"
    }

    $.ajax(request).done(function (res) {
        alert("added to your wishlist");
        location.reload();
    });
})
// }


// if(window.location.pathname == "/"){
$onRemoveWishlist = $("a.remove-from-wishlist");
$onRemoveWishlist.click(function () {
    var bookid = $(this).attr("data-id");
    var userid = $(this).attr("user-id");

    var request = {
        "url": `http://localhost:6060/api/users/wishlist?bookId=${bookid}&userId=${userid}`,
        "method": "DELETE"
    }

    $.ajax(request).done(function (res) {
        alert("Successfully removed from your wishlist...");
        location.reload();
    });
})
// }



if (window.location.pathname == "/") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function () {
        var id = $(this).attr("data-id");

        var request = {
            "url": `http://localhost:6060/api/books/${id}`,
            "method": "DELETE"
        }

        if (confirm("Do you really want to delete this record?")) {
            $.ajax(request).done(function (res) {
                alert("Data Deleted Successfully!!");
                location.reload();
            })
        }
    })
}

if (window.location.pathname == '/') {
    $ondelete = $(".table tbody td a.delete-author");
    $ondelete.click(function () {
        var id = $(this).attr("data-id");

        var request = {
            "url": `http://localhost:6060/api/authors/${id}`,
            "method": "DELETE"
        }

        if (confirm("Do you really want to delete this record.?")) {
            $.ajax(request).done(function (res) {
                alert("Data DELETED Successfully..");
                location.reload();
            })
        }
    })
}