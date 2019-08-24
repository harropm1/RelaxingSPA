"use strict";

$(function ()
{
    getCategories();

    $("#viewCategories").on("click", function ()
    {
        $("#viewCategories").prop("disabled", true);
        $("#categoryContainer").show();

        $("#jumbotron").hide();

        $("#serviceCard").hide();
        $("#servicesContainer").hide();
        $("#serviceImage").hide();
    });

    $("#home").on("click", function ()
    {
        $("#jumbotron").show();

        $("#categoryContainer").hide();
        $("#serviceCard").hide();
        $("#servicesContainer").hide();
        $("#serviceImageCard").hide();
    })
});

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

function getServiceList(category)
{
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

function getSpecificService(serviceId)
{
    $.getJSON(`/api/services/${serviceId}`, (service) =>
    {
        $("#ServiceName").html("Service Name: " + service.ServiceName);
        $("#ServiceID").html("Service Id: " + service.ServiceID);
        $("#CategoryName").html("\nCategory Name: " + service.CategoryName);
        $("#Description").html("Description: " + service.Description);
        $("#Price").html("Price: $" + Number(service.Price).toFixed(2));
        $("#Minutes").html("Length of Service (Minutes): " + service.Minutes);

        $("#serviceCard").show();
        $("#serviceImageCard").show();
        $("#serviceImage").show();
        $("#serviceImage").html("");

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