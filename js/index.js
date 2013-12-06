//------------------------------------------------------------------------
//  This javacript file contains references to the D3.js library, which
//  uses apis to manipulate scalable vector graphics dynamically based on
//  data supplied to the APIs. The majority of the APIs are easier to 
//  implement using global variables hence a large chunk of the code 
//  executed on load is not wrapped in a function. Forgive the lack of 
//  modularity.
//------------------------------------------------------------------------
    
    // Instructions  
    $('#directions').click(function() {
        window.alert("Enter numerical values into each of the fields in the personal budget calculator, then click the Calculate button. After entering in an initial set of data, tweak the numbers and hit Calculate again. Enjoy the smooth visual transitions.");
    });

    // Form validation
        //Make sure each field has a valid value before enabling calculate function
    $('input').keyup(function() {
        var incomplete = 0;
        var food = $('#food').val();
        if(!($.isNumeric(food))) {
            incomplete = 1;
        }
        var car = $('#car').val();
        if(!$.isNumeric(car)) {
            incomplete = 1;
        }
        var rent = $('#rent').val();
        if(!$.isNumeric(rent)) {
            incomplete = 1;
        }
        var expOther = $('#other').val();
        if(!$.isNumeric(expOther)) {
            incomplete = 1;
        }
        var wage = $('#wage').val();
        if(!$.isNumeric(wage)) {
            incomplete = 1;
        }
        var investments = $('#investments').val();
        if(!$.isNumeric(investments)) {
            incomplete = 1;
        }
        var incOther = $('#incOther').val();
        if(!$.isNumeric(incOther)) {
            incomplete = 1;
        }
        if(incomplete == 0) {
            $('#calc').removeAttr('disabled');
        } 
        else {
            $('#calc').attr('disabled', 'disabled');
        }
    });


    // Primary site function
        // Get all form values, build two arrays, then pass the arrays to the TransitionSVG function, and show our titles
    $('#calc').click(function() {
        var food = $('#food').val();
        var car = $('#car').val();
        var rent = $('#rent').val();
        var expOther = $('#other').val();
        var wage = $('#wage').val();
        var investments = $('#investments').val();
        var incOther = $('#incOther').val();
        income = [Number(wage), Number(investments), Number(incOther)];
        expenses = [Number(food), Number(car), Number(rent), Number(expOther)];
        
        TransitionSVG(expenses, income);
        
        $('.hidden').attr("class", "shown");
    });

    

// ----------------------------------------------------------------------------------------------------------
//  Commence initialization code. The following chunk of code sets the stage by using an empty data set to
//  building all of the SVG elements we'll be playing around with as data in the calculator changes
// ----------------------------------------------------------------------------------------------------------
    // Initialize basic variables
    var income = [0, 0, 0],
        expenses = [0, 0, 0, 0],
        margin = {top: 25, right: 50, bottom: 25, left: 50},
        width = 900 - margin.left - margin.right,
        height =  125 - margin.top - margin.bottom;

    var x = ResetScale("X", expenses, income);
    
    // -----------------------------------------------------    
    // Build stacked bar chart
    // -----------------------------------------------------    
        // Set chart area
        var chart = d3.select(".chart")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                      .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Bind initial data and starting location
        var bar = chart.selectAll("g")
            .data(expenses)
          .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0,0)"; });
        
        // Build bars for chart and establish classes
        bar.append("rect")
            .attr("class", function(d, i) { var barClass ="horizBar expBar"+String(i); return barClass; })
            .attr("width", x)
            .attr("height", height);

        xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom")

        chart.append("g")
            .attr("class", "stackedX axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
        
        // Create floating income bar
        chart.append("line")
            .attr("class", "incLine")
            .attr("x1", "0")
            .attr("y1", "0")
            .attr("x2", "0")
            .attr("y2", "75")
            .style("stroke", "white");

    // -----------------------------------------------------
    // Build income chart   
    // -----------------------------------------------------
        // Establish margins
        var margin = {top: 50, right: 50, bottom: 20, left: 50},
        width = 330 - margin.left - margin.right,
        height = 420 - margin.top - margin.bottom;
        
        
        
        // Set basic chart area
        var incChart = d3.select(".incChart")
                            .attr("width", width + margin.left + margin.right)
                            .attr("height", height + margin.top + margin.bottom)
                          .append("g")
                            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Set data range
        var y = ResetScale("incY", expenses, income);
        var x = ResetScale("X", expenses, income);
        
        // Bind data to containers for bar images
        var incBar = incChart.selectAll("g")
                .data(income)
            .enter().append("g")
                .attr("transform", function(d, i) { return "translate(" + ( i * (width/3) ) + ",0)"; });

        // Add bar to container
        incBar.append("rect")
            .attr("class", function(d, i) { var barClass = "incBar incBar" + String(i); return barClass; })
            .attr("y", y)
            .attr("width", (width/3) - 1)
            .attr("height", function(d) { return height - y(d); });

        // Add axes
            // Set ticks
        tickValues = ["Wages", "Investments", "Other"]
            
            // Set ordinal scale for ticks
        textX = d3.scale.ordinal()
                    .domain(tickValues)
                    .range([0, 100, 200]);
        
            // Build x axis
        var xAxis = d3.svg.axis()
                        .scale(textX)
                        .tickValues("")
                        .orient("bottom");
        
            // Add axis to chart area
        incChart.append("g")
            .attr("class", "incX axis")
            .attr("transform", "translate(25," + height + ")")
            .call(xAxis);
     
            // Build y axis
        var yAxis = d3.svg.axis()
                        .scale(y)
                        .orient("left")

            // Add axis to chart area
        incChart.append("g")
            .attr("class", "incY axis")
            .attr("transform", "translate(-40,0)")
            .call(yAxis);

    // -----------------------------------------------------
    // Build expenses chart    
    // -----------------------------------------------------
        // Establish margins
        var margin = {top: 50, right: 50, bottom: 20, left: 50},
        width = 300 - margin.left - margin.right,
        height = 420 - margin.top - margin.bottom;        
        
        // Set basic chart area
        var expChart = d3.select(".expChart")
                            .attr("width", width + margin.left + margin.right)
                            .attr("height", height + margin.top + margin.bottom)
                          .append("g")
                            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Set data range
        var y = ResetScale("expY", expenses, income);
        
        // Bind data to containers for bar images
        var expBar = expChart.selectAll("g")
                .data(expenses)
            .enter().append("g")
                .attr("transform", function(d, i) { return "translate(" + ( i * (width/4) ) + ",0)"; });

        // Add bar to container
        expBar.append("rect")
            .attr("class", function(d, i) { var barClass = "expBar expBar" + String(i); return barClass; })
            .attr("y", y)
            .attr("width", (width/4) - 1)
            .attr("height", function(d) { return height - y(d); });

        // Add axes
            // Set ticks
        tickValues = ["Food", "Car", "Rent", "Other"]
            
            // Set ordinal scale for ticks
        textX = d3.scale.ordinal()
                    .domain(tickValues)
                    .range([0, 50, 100, 150]);
        
            // Build x axis
        var xAxis = d3.svg.axis()
                        .scale(textX)
                        .tickValues("")
                        
                        .orient("bottom");
        
            // Add axis to chart area
        expChart.append("g")
            .attr("class", "expX axis")
            .attr("transform", "translate(25," + height + ")")
            .call(xAxis);
     
            // Build y axis
        var yAxis = d3.svg.axis()
                        .scale(y)
                        .orient("right")

            // Add axis to chart area
        expChart.append("g")
            .attr("class", "expY axis")
            .attr("transform", "translate(" + width + ",0)")
            .call(yAxis);
        

    //---------------------------------------------------------------------------------------------------------------------------------------------\\
    //  On-load code section complete. Two core functions follow.
    //---------------------------------------------------------------------------------------------------------------------------------------------\\

    function TransitionSVG(expenses, income) {
        // ---------------------------------------------------------------------------------------------------------- 
        //  Primary function responsible for manipulating SVG elements. Accepts two arrays of data, binds that data to 
        //  various SVG elements, then relocates and resizes SVG elements based on the bound data.
        // ----------------------------------------------------------------------------------------------------------  

        var x = ResetScale("X", expenses, income);
        // -----------------------------------------------------
        // Manipulate horizontal bars and axes
        // ----------------------------------------------------- 
            // Bind new data set to horizontal bars
            d3.selectAll(".horizBar")
                .data(expenses);
            
            // Begin transitions
                // Place horizontal bars (aka execute a function that holds the crown for "hardest thing ever to conceptualize")
            d3.selectAll(".horizBar").transition()
                .attr("width", function(d) { var horizWidth = (x(d) - 1); if(horizWidth < 0) { horizWidth = 0; } return horizWidth; })
                .attr("x", function(d, i) { 
                                            var xLoc = 0;
                                            for(var iter = 0; iter <= i; iter++) {
                                                    xLoc = xLoc + x(expenses[iter]);
                                                }
                                            return xLoc - x(expenses[i]);
                                            });

            // Reset axes
                // Set x axis range and labels
            var formatPercent = d3.format(".0%");

            // Get some global variables to use in our scales
            var totalExpense = 0;
            for (var i = expenses.length - 1; i >= 0; i--) {
                totalExpense = totalExpense + Number(expenses[i]);
            }
            var totalIncome = 0;
            for (var i = income.length - 1; i >=0; i--) {
                totalIncome = totalIncome + Number(income[i]);
            }
            if (totalExpense > totalIncome) {
                maxValue = totalExpense
            }
            else {
                maxValue = totalIncome
            }

            // Reset scale for x axis.
            xAxisScale = d3.scale.linear()
                        .domain([0, maxValue/totalIncome])
                        .range([0, 800]);

            // Build new x axis
            xAxis = d3.svg.axis()
                    .scale(xAxisScale)
                    .orient("bottom")
                    .tickFormat(formatPercent)

            // Transition to new x axis
            d3.select(".stackedX").transition()
                .call(xAxis);

            // Reset income slider
            d3.select(".incLine")
                .data([totalIncome])
                .style("stroke", "#33CC33");

            // Transition income slider to new location
            d3.select(".incLine").transition()
                .attr("x1", x)
                .attr("x2", x);


        // ----------------------------------------------------- 
        // Manipulate income bars and text                    
        // ----------------------------------------------------- 
                // Set x axis range and labels
            var totalIncome = 0;
            for (var i = income.length - 1; i >= 0; i--) {
                totalIncome = totalIncome + Number(income[i]);
            };

            var y = ResetScale("incY", expenses, income);

            // Bind new data to vertical bars and reset text labels
            d3.selectAll(".incBar")
                .data(income);
            d3.selectAll(".incText")
                .data(income)
                .text(function(d) { return "$"+d; });

            // Begin transitions
                // Transition vertical bars
            d3.selectAll(".incBar").transition()
                .attr("y", function(d) { return y(d);})
                .attr("height", function(d) { return height - y(d);});
            
                // Set x axis labels
            tickValues = ["Wages", "Investments", "Other"]
    
                // Set x label locations
            textX = d3.scale.ordinal()
                        .domain(tickValues)
                        .range([11, 91, 167]);

                // Build new x axis
            var xAxis = d3.svg.axis()
                            .scale(textX)
                            .ticks(4)
                            .tickValues(tickValues)
                            .orient("bottom");
                
                // Transition to new x axis
            d3.select(".incX").transition()
                .call(xAxis);

                // Set y axis range and labels
            yAxisScale = d3.scale.linear()
                        .domain([0, d3.max(income)/totalIncome])
                        .range([height, 0]);

                // Build new y axis
            var yAxis = d3.svg.axis()
                    .scale(yAxisScale)
                    .orient("right")
                    .tickFormat(formatPercent);
                
                // Transition to new y axis
            d3.selectAll(".incY").transition()
                .call(yAxis);


        // -----------------------------------------------------  
        // Manipulate expense bars and text
        // ----------------------------------------------------- 
            // Bind new data to vertical bars and reset scale
            d3.selectAll(".expBar")
                .data(expenses);

            var y = ResetScale("expY", expenses, income);

            // Begin transitions
                // Transition vertical bars
            d3.selectAll(".expBar").transition()
                .attr("y", function(d) { return y(d);})
                .attr("height", function(d) { return height - y(d);});
            
                // Set x axis labels
            tickValues = ["Food", "Car", "Rent", "Other"]
    
                // Set label locations
            textX = d3.scale.ordinal()
                        .domain(tickValues)
                        .range([0, 50, 100, 150]);

                // Build new x axis
            var xAxis = d3.svg.axis()
                            .scale(textX)
                            .ticks(4)
                            .tickValues(tickValues)
                            .orient("bottom");
            
                // Transition to new x axis
            d3.select(".expX").transition()
                .call(xAxis);

                // Set y axis range and labels
            yAxisScale = d3.scale.linear()
                        .domain([0, d3.max(expenses)/totalExpense])
                        .range([height, 0]);

                // Build new y axis
            var yAxis = d3.svg.axis()
                    .scale(yAxisScale)
                    .orient("right")
                    .tickFormat(formatPercent);
                
                // Transition to new y axis
            d3.selectAll(".expY").transition()
                .call(yAxis);
    }

    
    function ResetScale(string, expenses, income) {
        // This scaling function determines the appropriate visual scaling function, which is reset when new data is supplied to the site
        var scale = "";
        switch (string) {                
                case "X":
                    var totalExpense = 0;
                    for (var i = expenses.length - 1; i >= 0; i--) {
                        totalExpense = totalExpense + Number(expenses[i]);
                    }
                    var totalIncome = 0;
                    for (var i = income.length - 1; i >=0; i--) {
                        totalIncome = totalIncome + Number(income[i]);
                    }

                    if (totalExpense > totalIncome) {
                        maxValue = totalExpense
                    }
                    else {
                        maxValue = totalIncome
                    }
                    scale = d3.scale.linear()
                        .domain([0, maxValue])
                        .range([0, 800]);
                    break;

                case "incX":
                    var totalIncome = 0;
                    for (var i = income.length - 1; i >=0; i--) {
                        totalIncome = totalIncome + Number(income[i]);
                    }    
                    scale = d3.scale.linear()
                        .domain([0, totalIncome])
                        .range([0, 800]);
                    break;
                
                case "incY":
                    scale = d3.scale.linear()
                        .domain([0, d3.max(income)])
                        .range([height, 0]);
                    break;
                case "expY":
                    scale = d3.scale.linear()
                        .domain([0, d3.max(expenses)])
                        .range([height, 0]);
                    break;
            }
        return scale;
    }

