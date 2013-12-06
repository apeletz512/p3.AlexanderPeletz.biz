    // Perform primary calculations    
    $('#directions').click(function() {
        window.alert("Enter numerical values into each of the fields in the personal budget calculator, then click the Calculate button. After entering in an initial set of data, tweak the numbers and hit Calculate again. Enjoy the smooth visual transitions. Be careful that your total expenses don't exceed the red 'Total Income' bar  in the 'Total Expenses' chart.");
    })



    $('#calc').click(function() {
        var food = $('#food').val();
        var car = $('#car').val();
        var fun = $('#fun').val();
        var expOther = $('#other').val();
        var wage = $('#wage').val();
        var interest = $('#interest').val();
        var incOther = $('#incOther').val();
        
        $('.hidden').attr("class", "shown");

        income = [Number(wage), Number(interest), Number(incOther)];
        expenses = [Number(food), Number(car), Number(fun), Number(expOther)];
        BuildSVG(expenses, income);
    });

    $('.class')
    // Initialize basic variables
    var income = [0, 0, 0],
        expenses = [0, 0, 0, 0],
        margin = {top: 25, right: 50, bottom: 25, left: 50},
        width = 900 - margin.left - margin.right,
        height =  125 - margin.top - margin.bottom;

    var x = ResetScale("X", expenses, income);
        
    // Build stacked bar chart
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
            .attr("class", function(d, i) { var barClass ="horizBar bar"+String(i); return barClass; })
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

    // Build income chart   
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
            .attr("class", function(d, i) { var barClass = "incBar bar" + String(i); return barClass; })
            .attr("y", y)
            .attr("width", (width/3) - 1)
            .attr("height", function(d) { return height - y(d); });

        // Add axes
            // Set ticks
        tickValues = ["Wages", "Interest/Dividens", "Other"]
            
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

    // Build expenses chart    
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
            .attr("class", function(d, i) { var barClass = "expBar bar" + String(i); return barClass; })
            .attr("y", y)
            .attr("width", (width/4) - 1)
            .attr("height", function(d) { return height - y(d); });

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

        var x = ResetScale("X", expenses, income);
        // Manipulate horizontal bars and text
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

            xAxisScale = d3.scale.linear()
                        .domain([0, maxValue/totalIncome])
                        .range([0, 800]);

            var formatPercent = d3.format(".0%");

            xAxis = d3.svg.axis()
                    .scale(xAxisScale)
                    .orient("bottom")
                    .tickFormat(formatPercent)

            d3.select(".stackedX").transition()
                .call(xAxis);

            d3.select(".incLine")
                .data([totalIncome])
                .style("stroke", "red");

            d3.select(".incLine").transition()
                .attr("x1", x)
                .attr("x2", x);


        // Manipulate income bars and text                    
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
            tickValues = ["Wages", "Interest/Dividends", "Other"]
    
            textX = d3.scale.ordinal()
                        .domain(tickValues)
                        .range([11, 91, 167]);

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
                .data(expenses);
            d3.selectAll(".expText")
                .data(expenses)
                .text(function(d) { return "$"+d; });

            var y = ResetScale("expY", expenses, income);

            // Begin transitions
                // Transition vertical bars
            d3.selectAll(".expBar").transition()
                .attr("y", function(d) { return y(d);})
                .attr("height", function(d) { return height - y(d);});
            
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
                    var totalIncome = 0;
                    for (var i = income.length - 1; i >=0; i--) {
                        totalIncome = totalIncome + Number(income[i]);
                    }
                    console.log(totalIncome);
                    console.log(totalExpense);

                    if (totalExpense > totalIncome) {
                        maxValue = totalExpense
                    }
                    else {
                        maxValue = totalIncome
                    }
                    console.log(maxValue);
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
