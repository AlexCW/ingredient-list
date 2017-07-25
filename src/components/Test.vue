<style>
ul {
	list-style: none;
}

.row {
	margin: 0 auto;
	width: 100%;
}

.butn {
	border-radius: 3px;
	box-shadow: 15px;
	display:inline;
	color: #FFF;
	font-size: 18px;
	margin: 0 1%;
	width: 30%;
}

.butn-danger {
	background: rgb(255,0,0);
}

.butn-success {
	background: rgb(0,128,0);
}

.test {

	display: inline;
	width: 15%;
}

.note {
	border: 1px solid;
	padding: 15px 0;
}

.note ul li {
	border-bottom: 1px solid;
}

*:before,
*:after {
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
}

</style>

<template>
	<div id="template">
		<div class="row">
			<button class="butn">AAAA</button>
			<button class="test">Bbbb</button>
			<button class="butn butn-danger">AAAA</button>
			<button class="butn butn-success">BBBB</button>
		</div>
		<div class="row">
			<div class="note">
				<ul>
					<li>Make a List</li>
					<li>Checking it twice</li>
				</ul>
			</div>
		</div>
	</div>
</template>