"use strict";

/* This ready function calls the function get categories, which is passed no parameters.
* This ready function also sets what should happen when the "View Categories" button 
* (search our services in the html) is clicked.
* It also sets what should happen if the "home" button (spa offices in the html) is clicked.
*/
$(function ()
{
    getCategories();

    $("#viewCategories").on("click", function ()
    {
        //these are all of the different divs that are shown/hidden on the button click
        $("#viewCategories").prop("disabled", true);
        $("#categoryContainer").show();

        $("#jumbotron").hide();

        $("#serviceCard").hide();
        $("#servicesContainer").hide();
        $("#serviceImage").hide();
    });

    $("#home").on("click", function ()
    {
        //these are all of the different divs that are shown/hidden on the button click
        $("#jumbotron").show();

        $("#categoryContainer").hide();
        $("#serviceCard").hide();
        $("#servicesContainer").hide();
        $("#serviceImageCard").hide();
    })
});

/* 
* This function makes a JSON call to the server. It then dynamically creates a category list with anchor tags.
* @param - data - array = this the array that comes from the categories.json file. It helps create the list. 
*/
function getCategories()
{
    let categories;
    $.getJSON('/api/categories/', (data) =>
    {
        categories = data;
        for (let i = 0; i < categories.length; i++)
        {
            $("#categoryList").append($("<a />")
                .text(categories[i].Category)
                .attr("class", "dropdown-item")
                .attr("href", "#")
                .on("click", (e) =>
                {
                    e.preventDefault();
                    $("#categoryName").text(categories[i].Category);
                    getServiceList(categories[i].Value);
                }));
        }
    });
}

/* 
* This function makes a JSON call to the server.
* @param - category - string = this is the category chosen by the user.
* @param - services - array = this is array of services from services.json.
* From these, the function will pull the services that have a matching category to dynamically create the services list.
*/
function getServiceList(category)
{
    //these are all of the different divs that are hidden/cleared when the function is called
    $("#serviceCard").hide();
    $("#serviceImageCard").hide();
    $("#serviceList").html("");

    $.getJSON(`/api/services/bycategory/${category}`, (servicesArray) => 
    {
        $.each(servicesArray, (index, service) => 
        {
            $("#serviceList").append($("<li />")
                .text(service.ServiceName)
                .attr("class", "list-group-item")
                .on("click", (e) =>
                {
                    e.preventDefault();
                    getSpecificService(service.ServiceID);
                }));
        });
        $("#servicesContainer").show();
    });
}

/* 
* This function makes a JSON call to the server. It then dynamically creates a card with data about a specific service.
* @param - service - array = this the array that comes from the services.json file. 
* It provides a link to the data about a specific service.
* @param - servicdId - string = this is what the user clicked on from the services list generated above. 
* It points to a specific service.
*/

function getSpecificService(serviceId)
{
    $.getJSON(`/api/services/${serviceId}`, (service) =>
    {
        //this creates the data for the card
        $("#ServiceName").html("Service Name: " + service.ServiceName);
        $("#ServiceID").html("Service Id: " + service.ServiceID);
        $("#CategoryName").html("\nCategory Name: " + service.CategoryName);
        $("#Description").html("Description: " + service.Description);
        $("#Price").html("Price: $" + Number(service.Price).toFixed(2));
        $("#Minutes").html("Length of Service (Minutes): " + service.Minutes);

        //these are all of the different divs that are shown/cleared when the function is called
        $("#serviceCard").show();
        $("#serviceImageCard").show();
        $("#serviceImage").show();
        $("#serviceImage").html("");

        //this switch appends a different picture to an image card, depending on the category of service that is chosen.
        switch (service.CategoryName)
        {
            case "Acupuncture":
                $("#serviceImage").append($("<img class='card-img-top' alt='Spa Image' src='images/accupuncture-sm.jpg'/>"));
                break;
            case "Body Treatments":
                $("#serviceImage").append($("<img class='card-img-top' alt='Spa Image' src='images/body-sm.jpg'/>"));
                break;
            case "Hair Salon":
                $("#serviceImage").append($("<img class='card-img-top' alt='Spa Image' src='images/hair-sm.jpg'/>"));
                break;
            case "Massage and Bodywork":
                $("#serviceImage").append($("<img class='card-img-top' alt='Spa Image' src='images/massage-sm.jpg'/>"));
                break;
            case "Nail Salon":
                $("#serviceImage").append($("<img class='card-img-top' alt='Spa Image' src='images/nails-sm.jpg'/>"));
                break;
            case "Skin Care":
                $("#serviceImage").append($("<img class='card-img-top' alt='Spa Image' src='images/skin-sm.jpg'/>"));
                break;
            default:
                $("#serviceImage").append($("<img class='card-img-top' alt='Spa Image' src='images/small-spa2.jpg'/>"));
        }
    });
}