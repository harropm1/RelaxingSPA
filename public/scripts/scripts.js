"use strict";

$(function ()
{
    $("#viewCategories").on("click", function ()
    {
        getCategories();
        $("#viewCategories").prop("disabled", true);

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
        $("#serviceImage").hide();
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
        $("#categoryContainer").show();
    });
}

function getServiceList(category)
{
    $("#serviceCard").hide();
    $("#serviceImage").hide();
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
        $("#CategoryName").html("Category Name: " + service.CategoryName);
        $("#Description").html("Description: " + service.Description);
        $("#Price").html("Price: $" + Number(service.Price).toFixed(2));
        $("#Minutes").html("Length of Service (Minutes): " + service.Minutes);

        $("#serviceCard").show();
        let image = $("#serviceImage");
        image.show();

        switch (service.CategoryName.val())
        {
            case "Acupuncture":
                image.attr("src", "images/accupuncture-sm.jpg");
                break;
            case "Body Treatments":
                image.attr("src", "images/body-sm.jpg");
                break;
            case "Hair Salon":
                image.attr("src", "images/hair-sm.jpg");
                break;
            case "Massage and Bodywork":
                image.attr("src", "images/massage-sm.jpg");
                break;
            case "Nail Salon":
                image.attr("src", "images/nails-sm.jpg");
                break;
            case "Skin Care":
                image.attr("src", "images/skin-sm.jpg");
                break;
            default:
                image.attr("src", "images/small-spa2.jpg");
        }
    });
}