@font-face {
	font-family: "<%= fontName %>";
	src: url('<%= fontPath %><%= fontName %>.eot');
	src: url('<%= fontPath %><%= fontName %>.eot?time=<%= new Date().getTime() %>#iefix') format('eot'),
		url('<%= fontPath %><%= fontName %>.woff?time=<%= new Date().getTime() %>') format('woff'),
		url('<%= fontPath %><%= fontName %>.ttf?time=<%= new Date().getTime() %>') format('truetype'),
		url('<%= fontPath %><%= fontName %>.svg?time=<%= new Date().getTime() %>#<%= fontName %>') format('svg');
}

.icon:before {
	font-family: "<%= fontName %>";
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	font-style: normal;
	font-variant: normal;
	font-weight: normal;
	/* speak: none; only necessary if not using the private unicode range (firstGlyph option) */
	text-decoration: none;
	text-transform: none;
}
.icon{
	display:inline-block;
}

<% _.each(glyphs, function(glyph) { %>
.icon-<%= glyph.fileName %>:before {
	content: "\<%= glyph.codePoint %>";
}
<% }); %>
