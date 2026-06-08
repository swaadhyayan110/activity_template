<!DOCTYPE html>
<html>

<head>
	<?php header("Access-Control-Allow-Origin: *");?>
	<title>
		<?= $title ?>
	</title>
	<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	<link rel="icon" type="image/png" sizes="16x16" href="images/favicon.png">
	<link
		href="https://fonts.googleapis.com/css?family=Noto+Sans|Poppins|Pragati+Narrow|Yantramanav|Allerta+Stencil|Anton|Baloo|Baloo+Bhaijaan|Crafty+Girls|Finger+Paint|Joti+One|Lato|Mukta|Muli|Noto+Sans|Nova+Slim|Oswald|Poppins|Rhodium+Libre|Roboto+Condensed|Roboto:400,500|Strait|Ubuntu"
		rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="css/customButtonsNewSty.css">
	<link href="https://fonts.googleapis.com/css?family=Noto+Sans|Poppins|Pragati+Narrow|Yantramanav" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="css/hindiFonts.css">
	<link rel="stylesheet" type="text/css" href="css/newActCss/fonts.css">
	<link rel="stylesheet" type="text/css" href="css/newActCss/mcq.css">
	<link rel="stylesheet" type="text/css" href="css/newActCss/fillUp.css">
	<link rel="stylesheet" type="text/css" href="css/newActCss/matchType3.css">
	<link rel="stylesheet" href="css/newActCss/lbdText.css">
	<link rel="stylesheet" href="css/bootstrap.min.css" />
	<script type="text/javascript" src="js/jquery-3.7.1.min.js"></script>
	<script type="text/javascript" src="js/popper.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/newActJS/funScript.js"></script>

	<script type="text/javascript" src="js/anime.min.js"></script>
	<script src="js/sweet.js"></script>
	<link rel="stylesheet" href="css/fonts.css" />
	<script src="js/jquery-ui.min.js"></script>
	<script src="js/jquery.ui.touch-punch.min.js"></script>
	<link rel="stylesheet" href="css/aos.css">
	<script src="js/aos.js"></script>
	<script>
		const assets_url = `<?=IMAGES_URL?>`
	</script>
	<script>
		$(document).ready(function (e) {
			disableAutoComplete();
		});
		
		function disableAutoComplete() {
			let inputBoxes = document.getElementsByTagName("input");
			for (const input of inputBoxes) {
				input.setAttribute('autocomplete', 'off');
			}
		}

		function sectionBoxDiv() {
			setTimeout(function () {
				$("#paraSubH2 .ParaSubHeading").css("opacity", 1);
				// Wrap every letter in a span
				$('#paraSubH2 .ParaSubHeading').each(function () {
					$(this).html($(this).text().replace(/([^\x00-\x255]|\w)/g, "<span class='letter'>$&</span>"));
				});

				anime.timeline({ loop: false })
					.add({
						targets: '#paraSubH2 .ParaSubHeading .letter',
						scale: [4, 1],
						opacity: [0, 1],
						translateZ: 0,
						easing: "easeOutExpo",
						duration: 2500,
						delay: function (el, i) {
							return 250 * i;
						}
					});
			}, 1000);

			setTimeout(function () {
				$("#pfill_1").show(3000);
			}, 6000);
			setTimeout(function () {
				$("#pfill_2").show(3000);
			}, 9000);
			setTimeout(function () {
				$("#pfill_3").show(3000);
			}, 12000);
			setTimeout(function () {
				$("#pfill_4").show(3000);
			}, 15000);
			setTimeout(function () {
				$("#pfill_5").show(3000);
			}, 18000);
			setTimeout(function () {
				$("#pfill_6").show(3000);
			}, 21000);
		}
		sectionBoxDiv();
		function backToPreviousPage() {
			return history.go(-1);
		}
	</script>
	<?php 

$subContainerMargin='60px auto;';

$bgImg=isset($bgImage)? COMMON_IMAGES_URL.$bgImage: IMAGES_URL.'bg.jpg';
//echo '<div style="color:#000; z-index:20000;">'.$bgImg.'</div>';

/*check if sub menu exists*/
// echo '<style>.container-sub { border: 2px solid '.$headerBgMenuList.';}</style>';
if($isSubMenu==false){ $headerBgMenuList='transparent'; $subContainerMargin='10px auto;'; } 
include_once('functionFile.php');
include_once 'styleForClass.php';

?>
	<style>
		.ml15,
		#timer {
			/* background-color:<?=$headerBgColor?>; */
			/* border: 2px solid; */
			/* border-radius: 9px; */
			height: 53px;
			/* border-top-right-radius: 0;
    border-top-left-radius: 0; */
			/* border-top: none; */
			padding-top: 3%;
		}

		/* .vkSubMenuUL-li {background: linear-gradient(<?=$btnLightClr?>,<?=$btnDarkClr?>); } */
		/* .vkSubMenuUL-li:hover{ 	background:linear-gradient(<?=$btnDarkClr?>,<?=$btnLightClr?>);	} */
		.activeLi {
			display: inline-block;
			background-color:  #115f97ff !important;
			/* color: #fff;filter: drop-shadow(4px 4px 4px #222);	 */
			padding: 2px 12px;
			cursor: pointer;
			margin-left: 10px;
			margin-top: 0.2%;
			border: 2px solid;
			border-radius: 9px;
			border-top-right-radius: 0;
			border-top-left-radius: 0;
			border-top: none;

		}

		/*<--*/
		.pt-3,
		.py-3 {
			padding-top: 32px !important;
		}

		/* .vkSubMenu {margin: 5px auto;} */
		.vkSubmenuDiv {
			background-color: <?=$headerBgMenuList;
			?>;
			z-index: 1000;
		}

		#vkSubMenuUL {
			margin-bottom: 0px;
		}

		.container-sub {
			margin: 0 !important;
			height: 88vh !important;
			border: none;
		}

		.mainOuterContainer {
			width: 100%;
			position: fixed;
			z-index: 1009;
			font-size: 22px;
			top: 0;
			z-index: 9;
		}

		/*-->*/
		.listNumbers {
			margin-left: -30px;
		}

		.container-main {
			margin-top: 47px;
		}

		#btnBackActivity i {
			margin: 1px 9px 0 0;
			font-size: 21px;
		}

		#btnBackActivity {
			width: 75px !important;
			position: fixed;
			right: 0px;
			background-color: <?=$headerBgColor?>;
			color: #fff;
			margin-top: 89px;
			border-top-left-radius: 5px;
			border-bottom-left-radius: 5px;
			padding: 3px 5px;
			font-size: 16px;
			cursor: pointer;
			transition: 2s;
			/*	-webkit-transition-duration: 1s;
	-moz-transition-duration: 1s;
	-o-transition-duration: 1s;
	transition-duration: 1s;*/
			text-align: center;
			z-index: 1000;
		}




		/* class added by pawan*/
		.printBtn {
			width: 75px;
			position: fixed;
			right: 0;
			background-color: <?=$headerBgColor?>;
			color: #fff;
			top: 130px;
			border-top-left-radius: 5px;
			border-bottom-left-radius: 5px;
			padding: 3px 5px;
			font-size: 16px;
			cursor: pointer;
			text-align: center;
			z-index: 100;
		}

		iframe {
			height: 95vh;
		}

		/* end class */
		#btnBackActivity1:hover {
			width: 75px;
			padding-left: 20px
		}

		.arrow-left {
			position: absolute;
			margin-top: 3px;
			margin-left: -12px;
			width: 0;
			height: 0;
			border-top: 9px solid transparent;
			border-bottom: 9px solid transparent;
			border-right: 9px solid <?=$headerBgColor?>;

		}
.container-sub {
}
		.img-thumbnail {
			background-color: transparent;
			border: none;
		}

		.containerRadio {
			font-weight: normal;
		}

		/* .vkSubmenuDiv {
    z-index: 1;
    padding-top: 0px;
} */

		@media screen and (max-width:1024px) {
			#pointer2 {
				background: none !important;
			}

			#pointer1 {
				background: none !important;
			}

			body #timer {
				font-size: 16px !important;
				padding-top: 7px !important;

			}
		
		}

		@media screen and (max-width: 468px) {

			.container-main {
				padding-top: 0 !important;
				margin-top: 2px;
			}

			.container-content {
				padding: 3%;
			}

			.exerciseDiv {
				height: 95vh !important;
			}
	.container-sub {
		
			height: 95vh !important;
		}
			body #timer {
				font-size: 15px !important;
				padding-top: 10px !important;
				width: 63px !important;
			}

			body .ml15 {
				padding-top: 6px !important;
				font-size: 13px !important;
				width: 53% !important;
			}

			#btnBackActivity {
				margin-top: 102px;
			}

			#pointer2 {
				background: none;
			}

			#pointer1 {
				background: none;
			}

			#timer {
				width: 104% !important;
				font-size: 16px !important;
				padding-top: 7px !important;
			}

			.social-science #pointer2 #timer {
				white-space: nowrap;

			}
		}


		@media screen and (min-width:0px) and (max-width:480px) {
			body .ml15 .word {
				line-height: 16px !important;
				margin-top: -1px;
			}

			.social-science #pointer2 #timer {
				font-size: 13px !important;
				white-space: nowrap;
				float: right !important;
				margin-right: -5px !important;
			}

			#pointer1::before {
				display: none;
			}

			#pointer2::after {
				display: none;
			}

			.ml15 {
				width: 53% !important;
				padding-left: 0px;
				padding-right: 0px;
				padding-top: 5px !important;
				font-size: 16px !important;
			}

			#pointer2 {
				background: none;
				height: 32px !important;
			}

			#pointer1 {
				background: none;
				height: 32px !important;
			}

			body #timer {
				width: 104% !important;
				font-size: 15px !important;
				padding-top: 7px !important;
			}

			#btnBackActivity {
				margin-top: 99px;
			}

			#btnBackActivity i {
				margin: 1px 11px 0 0;
			}

		}
	</style>
	<link rel="stylesheet" type="text/css" href="css/activityMediaQueryNew.css">
	<script type="text/javascript">
		if (document.layers) {
			//Capture the MouseDown event.
			document.captureEvents(Event.MOUSEDOWN);

			//Disable the OnMouseDown event handler.
			document.onmousedown = function () {
				return false;
			};
		}
		else {
			//Disable the OnMouseUp event handler.
			document.onmouseup = function (e) {
				if (e != null && e.type == "mouseup") {
					//Check the Mouse Button which is clicked.
					if (e.which == 2 || e.which == 3) {
						//If the Button is middle or right then disable.
						return false;
					}
				}
			};
		}

		//Disable the Context Menu event.
		document.oncontextmenu = function () {
			return false;
		};

		// disable f12
		window.onkeydown = function (e) {
			if (e.which == 123 || e.which == 18) {
				return false;
			}
		}
		//  code added by pawan
		window.addEventListener('DOMContentLoaded', () => {
			let iframe = document.querySelectorAll('[showprint="true"]')[0];
			if (iframe != undefined) {
				let showPrint = iframe.getAttribute('showprint');
				let printBtn = document.createElement('div');

				printBtn.onclick = () => {
					iframe.focus();
					iframe.contentWindow.print();
				}
				printBtn.classList.add('printBtn');
				printBtn.innerHTML = '<div class="arrow-left"></div>Print';
				document.body.insertBefore(printBtn, document.getElementsByClassName('mainOuterContainer')[0]);
			}
		});
		//  end of code
	</script>
	<meta charset="UTF-8">
	<meta charset="ISO-8859-1">
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
</head>
<?php

function mainHeadingClass($string) {
    $string = trim($string); 
    $string = strtolower($string); 
    $string = preg_replace("/[^a-z0-9_\s-]/", "", $string);
    $string = preg_replace("/[\s-]+/", " ", $string); 
    $string = preg_replace("/[\s_]/", "-", $string); 
    return $string;
}
 ?>

<body class="<?=mainHeadingClass($Subject)." cls-".$urlv[0]." ".mainHeadingClass($mainHeading);?>" oncontextmenu="return false;" onkeydown="if ((arguments[0] || window.event).ctrlKey) return false">
	<div class="container-fluid">
		<div class="headersSections">
			<div class="textIntro">
				<?php 
					if($Subject=='SocialScienceN'){
						echo 'Social-Science';
					}
					elseif($Subject=='MathN'){
						echo 'Mathematics'; 
					}
					elseif($Subject=='EnglishN'){
						echo 'English'; 
					}
					elseif($Subject=='EVSN'){
						echo 'EVS'; 
					}
					elseif($Subject=='ScienceN'){
						echo 'Science'; 
					}	
					elseif($Subject=='SSTExploring'){
						echo 'Social-Science'; 
					}
					elseif($Subject=='HindiN'){
						echo 'हिंदी'; 
					}
					else{
						echo $Subject; 
					}
				?>
				<span>
					-
					<?php echo filter_var($ClassID, FILTER_SANITIZE_NUMBER_INT);?>
				</span>
			</div>
			<div class="textIntro"><?= $mainHeading ?></div>
		</div>
		<div class="clearfix"></div>
	</div>
	<div class="WhiteBoxes">
	<!-- <div class="container-main">
		<div class="exerciseDiv" style="overflow-y: auto;"> -->



		