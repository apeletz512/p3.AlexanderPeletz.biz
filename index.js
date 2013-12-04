<!DOCTYPE html>
<head>
<script type="text/javascript" src="D3/d3.v3.min.js"></script>
<script>
	d3.select("body").selectAll("p")
    	.data([4, 8, 15, 16, 23, 42])
  			.enter().append("p")
    	.text(function(d) { return "I’m number " + d + "!"; });

    console.log(d);
</script>
<body>

	<p>Here is some text.</p>

</body>
</head>
</html>