    // Add data to value at specific index location
    $('#addBtn').click(function() {
        var newData = $('#add').val();
        newTotal = Number(data[3])+Number(newData);
        data[3] = newTotal;
        BuildSVG(data);

    });

    
    // Perform primary calculations    
    $('#calc').click(function() {
        var food = $('#food').val();
        var car = $('#car').val();
        var fun = $('#fun').val();
        var other = $('#other').val();
        var wage = $('#wage').val();
        var interest = $('#interest').val();
        var incOther = $('#incOther').val();

        income = [(Number(wage)+Number(interest)+Number(incOther))];
        expenses = [Number(food), Number(car), Number(fun), Number(other)];
        BuildSVG(expenses, income);

    });


    // Initialize basic variables
    var data = [0, 0, 0, 0];
    var margin = {top: 25, right: 50, bottom: 25, left: 50},
        width = 900 - margin.left - margin.right,
        height =  125 - margin.top - margin.bottom;

    var x = ResetScale("X", data);
        
    // Build stacked bar chart
        // Set chart area
        var chart = d3.select(".chart")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                      .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Bind initial data and starting location
        var bar = chart.selectAll("g")
            .data(data)
          .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0,0)"; });
        
        // Build bars for chart and establish classes
        bar.append("rect")
            .attr("class", function(d, i) { var barClass ="horizBar bar"+String(i); return barClass; })
            .attr("width", x)
            .attr("height", height);
        
        // Create text labels
        bar.append("text")
            .attr("class", "horizText")
            .attr("x", function(d) { return x(d) - 3; })
            .attr("y", height / 2)
            .attr("dy", ".35em")
            .text(function(d) { return d; });

        xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom")

        chart.append("g")
            .attr("class", "vertx axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
        
        // Create floating income bar
        chart.append("line")
            .attr("class", "incLine")
            .attr("x1", "200")
            .attr("y1", "0")
            .attr("x2", "200")
            .attr("y2", "75");

    // Build income chart   
        // Establish margins
        var margin = {top: 50, right: 50, bottom: 50, left: 50},
        width = 300 - margin.left - margin.right,
        height = 420 - margin.top - margin.bottom;
        
        incData = [0, 0, 0];
        
        // Set basic chart area
        var incChart = d3.select(".incChart")
                            .attr("width", width + margin.left + margin.right)
                            .attr("height", height + margin.top + margin.bottom)
                          .append("g")
                            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Set data range
        var y = ResetScale("Y", incData);
        var x = ResetScale("X", incData);
        
        // Bind data to containers for bar images
        var incBar = incChart.selectAll("g")
                .data(incData)
            .enter().append("g")
                .attr("transform", function(d, i) { return "translate(" + ( i * (width/3) ) + ",0)"; });

        // Add bar to container
        incBar.append("rect")
            .attr("class", function(d, i) { var barClass = "incBar bar" + String(i); return barClass; })
            .attr("y", y)
            .attr("width", (width/3) - 1)
            .attr("height", function(d) { return height - y(d); });

        // Add text to bar
        incBar.append("text")
            .attr("class", "incText")
            .attr("x",  (width/3) - 10)
            .attr("y", function(d) {return y(d) + 3;})
            .attr("dy", ".75em")
            .attr("dx", ".5em")
            .text(function(d) { return d; });

        // Add axes
            // Set ticks
        tickValues = ["Wages", "Interest/Dividens", "Other"]
            
            // Set ordinal scale for ticks
        textX = d3.scale.ordinal()
                    .domain(tickValues)
                    .range([0, 66, 133]);
        
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
                        .orient("right")

            // Add axis to chart area
        incChart.append("g")
            .attr("class", "incY axis")
            .attr("transform", "translate(" + width + ",0)")
            .call(yAxis);

    // Build expenses chart    
        // Establish margins

        var margin = {top: 50, right: 50, bottom: 50, left: 50},
        width = 300 - margin.left - margin.right,
        height = 420 - margin.top - margin.bottom;
        
        expData = [0, 0, 0, 0];
        
        // Set basic chart area
        var expChart = d3.select(".expChart")
                            .attr("width", width + margin.left + margin.right)
                            .attr("height", height + margin.top + margin.bottom)
                          .append("g")
                            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Set data range
        var y = ResetScale("Y", expData);
        var x = ResetScale("X", expData);
        
        // Bind data to containers for bar images
        var expBar = expChart.selectAll("g")
                .data(expData)
            .enter().append("g")
                .attr("transform", function(d, i) { return "translate(" + ( i * (width/4) ) + ",0)"; });

        // Add bar to container
        expBar.append("rect")
            .attr("class", function(d, i) { var barClass = "expBar bar" + String(i); return barClass; })
            .attr("y", y)
            .attr("width", (width/4) - 1)
            .attr("height", function(d) { return height - y(d); });

        // Add text to bar
        expBar.append("text")
            .attr("class", "expText")
            .attr("x",  (width/4) - 10)
            .attr("y", function(d) {return y(d) + 3;})
            .attr("dy", ".75em")
            .attr("dx", ".5em")
            .text(function(d) { return d; });

        // Add axes
            // Set ticks
        tickValues = ["Gas", "Car", "Food", "Other"]
            
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
    //---------------------------------------------------------------------------------------------------------------------------------------------\\
    //---------------------------------------------------------------------------------------------------------------------------------------------\\


    function BuildSVG(expenses, income) {
        // Primary function responsible for manipulating SVG elements
        var data = expenses
        var expData = expenses;
        var incData = income;
       /*
        var g = d3.selectAll("g")
            .data(data);
        */
        var x = ResetScale("X", expenses, income);
        var y = ResetScale("expY", expenses, income);

        // Manipulate horizontal bars and text
            // Bind new data set to horizontal bars
            d3.selectAll(".horizBar")
                .data(data);
            
            // Begin transitions
                // Place horizontal bars (aka execute a function that holds the crown for "hardest thing ever to conceptualize")
            d3.selectAll(".horizBar").transition()
                .attr("width", function(d) { var horizWidth = (x(d) - 1); if(horizWidth < 0) { horizWidth = 0; } return horizWidth; })
                .attr("x", function(d, i) { 
                                            var xLoc = 0;
                                            for(var iter = 0; iter <= i; iter++) {
                                                    xLoc = xLoc + x(data[iter]);
                                                }
                                            return xLoc - x(data[i]);
                                            });

                // Place text labels for horizontal chart
            d3.selectAll(".horizText")
                .data(data)
                .text(function(d) { if(d > 0) { return "$"+d; }});
                
                // Set location of labels
            d3.selectAll(".horizText")//.transition()
                    .attr("x", function(d, i) { 
                                            var xLoc = 0;
                                            for(var iter = 0; iter <= i; iter++) {
                                                    xLoc = xLoc + x(data[iter]);
                                                }
                                            return xLoc - 3;
                                            });

                // Reset axis
            
                // Set x axis range and labels
            var formatPercent = d3.format(".0%");

            var totalExpense = 0;
            for (var i = expenses.length - 1; i >= 0; i--) {
                totalExpense = totalExpense + Number(expenses[i]);
            };
            
            if (totalExpense > income) {
                maxX = totalExpense;
            }
            else {
                maxX = income;
            }

            xAxisScale = d3.scale.linear()
                        .domain([0, maxX/income])
                        .range([0, 800]);


            xAxis = d3.svg.axis()
                    .scale(xAxisScale)
                    .orient("bottom")
                    .tickFormat(formatPercent)

            d3.select(".vertx").transition()
                .call(xAxis);

            d3.select(".incLine")
                .data(income);
            
            d3.select(".incLine").transition()
                .attr("x1", x)
                .attr("x2", x);


        // Manipulate income bars and text
                        
                // Set x axis range and labels
            var totalIncome = 0;
            for (var i = income.length - 1; i >= 0; i--) {
                totalIncome = totalIncome + Number(income[i]);
            };
            

            // Bind new data to vertical bars and reset text labels
            d3.selectAll(".incBar")
                .data(incData);
            d3.selectAll(".incText")
                .data(incData)
                .text(function(d) { return "$"+d; });

            // Begin transitions
                // Transition vertical bars
            d3.selectAll(".incBar").transition()
                .attr("y", function(d) { return y(d);})
                .attr("height", function(d) { return height - y(d);});
            
                // Transition location of labels on vert vars
            d3.selectAll(".incText").transition()
                .attr("y", function(d) { return y(d) + 3; });
            
                // Set x axis labels
            tickValues = ["Wages", "Interest/Dividends", "Other"]
    
            textX = d3.scale.ordinal()
                        .domain(tickValues)
                        .range([0, 66, 133]);

            var xAxis = d3.svg.axis()
                            .scale(textX)
                            .ticks(4)
                            .tickValues(tickValues)
                            .orient("bottom");
            
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



        // Manipulate expense bars and text
            // Bind new data to vertical bars and reset text labels
            d3.selectAll(".expBar")
                .data(expData);
            d3.selectAll(".expText")
                .data(expData)
                .text(function(d) { return "$"+d; });

            // Begin transitions
                // Transition vertical bars
            d3.selectAll(".expBar").transition()
                .attr("y", function(d) { return y(d);})
                .attr("height", function(d) { return height - y(d);});
            
                // Transition location of labels on vert vars
            d3.selectAll(".expText").transition()
                .attr("y", function(d) { return y(d) + 3; });
            
                // Set x axis labels
            tickValues = ["Gas", "Cars", "Food", "Other"]
    
            textX = d3.scale.ordinal()
                        .domain(tickValues)
                        .range([0, 50, 100, 150]);

            var xAxis = d3.svg.axis()
                            .scale(textX)
                            .ticks(4)
                            .tickValues(tickValues)
                            .orient("bottom");
            
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
        // This scaling function determines input and output ranges which are commonly reset when new data is supplied to the site
        var scale = "";
        switch (string) {                
                case "X":
                    var totalExpense = 0;
                    for (var i = expenses.length - 1; i >= 0; i--) {
                        totalExpense = totalExpense + Number(expenses[i]);
                    }
                    if (totalExpense > income) {
                        maxValue = totalExpense
                    }
                    else {
                        maxValue = income
                    }
                    scale = d3.scale.linear()
                        .domain([0, maxValue])
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


        //$('#lucy').css('border','3px solid red');
        //$('.ricardo').css('background-color','yellow');
        //$('body').css('background-color','yellow');
        //$('div').css("background-color",'green');
        //$('div').remove();


    $('#lucy').click(function() {   
        var color = $('input').val();
        $(this).css("background-color",color)});
    
    $('#ricky').click(function() {
        $('.ricardo').remove(); });
