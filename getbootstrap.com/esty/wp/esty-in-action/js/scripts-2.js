(function ($) {

	"use strict";

	// =====================================================
	//      PRELOADER
	// =====================================================
	$(window).on("load", function () {
		'use strict';
		$('[data-loader="circle-side"]').fadeOut(); // will first fade out the loading animation
		$('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.		
	});

	// =====================================================
	//      BACK TO TOP BUTTON
	// =====================================================
	function scrollToTop() {
		$('html, body').animate({ scrollTop: 0 }, 500, 'easeInOutExpo');
	}

	$(window).on('scroll', function () {
		if ($(this).scrollTop() > 100) {
			$('#toTop').fadeIn('slow');
		} else {
			$('#toTop').fadeOut('slow');
		}
	});

	$('#toTop').on('click', function () {
		scrollToTop();
		return false;
	});

	// =====================================================
	//      NAVBAR
	// =====================================================
	$(window).on('scroll load', function () {

		if ($(window).scrollTop() >= 1) {
			$('.main-header').addClass('active');
		} else {
			$('.main-header').removeClass('active');
		}

	});

	// =====================================================
	//      STICKY SIDEBAR SETUP
	// =====================================================
	$('#mainContent, #sidebar').theiaStickySidebar({
		additionalMarginTop: 90
	});

	// =====================================================
	//      MOBILE MENU
	// =====================================================	
	var $menu = $("nav#menu").mmenu({
		"extensions": ["pagedim-black", "theme-white"], // "theme-dark" can be changed to: "theme-white"
		counters: true,
		keyboardNavigation: {
			enable: true,
			enhance: true
		},
		navbar: {
			title: 'MENU'
		},
		navbars: [{ position: 'bottom', content: ['<a href="#">© 2020 Esty</a>'] }]
	},
		{
			// configuration
			clone: true,
		});
	var $icon = $("#hamburger");
	var API = $menu.data("mmenu");
	$icon.on("click", function () {
		API.open();
	});
	API.bind("open:finish", function () {
		setTimeout(function () {
			$icon.addClass("is-active");
		}, 100);
	});
	API.bind("close:finish", function () {
		setTimeout(function () {
			$icon.removeClass("is-active");
		}, 100);
	});

	// =====================================================
	//      CALCULATOR ELEMENTS
	// =====================================================	

	// Function to format item prices usign priceFormat plugin
	function formatItemPrice() {
		$('.price').priceFormat({
			prefix: '$ ',
			centsSeparator: '.',
			thousandsSeparator: ','
		});
	}

	// Function to format total price usign priceFormat plugin
	function formatTotalPrice() {
		$('#total').priceFormat({
			prefix: '$ ',
			centsSeparator: '.',
			thousandsSeparator: ','
		});
	}

	// Function to set total title and price initially
	function setTotalOnStart() {

		$('#totalTitle').val('Total');
		$('#total').val('$ 0.00');

	}

	// Variables for calculation
	var singleOption1IsChecked = false;
	var singleOption1Title = '';
	var singleOption1Price = 0;
	var actualQty1 = 0;
	var subSum1 = 0;

	var singleOption2IsChecked = false;
	var singleOption2Title = '';
	var singleOption2Price = 0;
	var actualQty2 = 0;
	var subSum2 = 0;

	var singleOption3IsChecked = false;
	var singleOption3Title = '';
	var singleOption3Price = 0;
	var actualQty3 = 0;
	var subSum3 = 0;

	var extraOption1IsChecked = false;
	var extraOption1Title = '';
	var extraOption1Price = 0;

	var extraOption2IsChecked = false;
	var extraOption2Title = '';
	var extraOption2Price = 0;

	var total = 0;

	// Function to manage the calculations and update summary
	function updateSummary() {

		// Get the current data from option1Single elements
		singleOption1IsChecked = $('#option1Single').is(':checked');
		singleOption1Title = $('#option1SingleTitle').text();
		singleOption1Price = $('#option1Single').val();
		actualQty1 = $('#option1SingleQty').val();

		// Update order summary with option1Single details
		if (singleOption1IsChecked && (actualQty1 != 0)) {

			subSum1 = (singleOption1Price * 1) * (actualQty1 * 1);
			$('#option1SingleSum').html('<a href="javascript:;" id="option1SingleSumReset"><i class="fa fa-times-circle"></i></a> ' + singleOption1Title + ' x ' + actualQty1 + '<span class="price">' + subSum1.toFixed(2) + '</span>');
			formatItemPrice();

		} else { // If option is not checked

			subSum1 = 0;
			clearSummaryLine('option1SingleSum');

		}

		// Get the current data from option2Single elements		
		singleOption2IsChecked = $('#option2Single').is(':checked');
		singleOption2Title = $('#option2SingleTitle').text();
		singleOption2Price = $('#option2Single').val();
		actualQty2 = $('#option2SingleQty').val();

		// Update order summary with option2Single details
		if (singleOption2IsChecked && (actualQty2 != 0)) {

			subSum2 = (singleOption2Price * 1) * (actualQty2 * 1);
			$('#option2SingleSum').html('<a href="javascript:;" id="option2SingleSumReset"><i class="fa fa-times-circle"></i></a> ' + singleOption2Title + ' x ' + actualQty2 + '<span class="price">' + subSum2.toFixed(2) + '</span>');
			formatItemPrice();

		} else { // If option is not checked

			subSum2 = 0;
			clearSummaryLine('option2SingleSum');

		}

		// Get the current data from option3Single elements
		singleOption3IsChecked = $('#option3Single').is(':checked');
		singleOption3Title = $('#option3SingleTitle').text();
		singleOption3Price = $('#option3Single').val();
		actualQty3 = $('#option3SingleQty').val();

		// Update order summary with option3Single details
		if (singleOption3IsChecked && (actualQty3 != 0)) {

			subSum3 = (singleOption3Price * 1) * (actualQty3 * 1);
			$('#option3SingleSum').html('<a href="javascript:;" id="option3SingleSumReset"><i class="fa fa-times-circle"></i></a> ' + singleOption3Title + ' x ' + actualQty3 + '<span class="price">' + subSum3.toFixed(2) + '</span>');
			formatItemPrice();

		} else { // If option is not checked

			subSum3 = 0;
			clearSummaryLine('option3SingleSum');

		}

		// Get the current data from extraOption1 
		extraOption1IsChecked = $('#extraOption1').is(':checked');
		extraOption1Title = $('#extraOption1Title').text();
		extraOption1Price = $('#extraOption1').val();

		if (extraOption1IsChecked) {

			extraOption1Price = extraOption1Price * 1;
			$('#extraOption1Sum').html('<a href="javascript:;" id="extraOption1SumReset"><i class="fa fa-times-circle"></i></a> ' + extraOption1Title + '<span class="price">' + extraOption1Price.toFixed(2) + '</span>');
			formatItemPrice();

		} else { // If option is not checked

			extraOption1Price = 0;
			clearSummaryLine('extraOption1Sum');

		}

		// Get the current data from extraOption2 
		extraOption2IsChecked = $('#extraOption2').is(':checked');
		extraOption2Title = $('#extraOption2Title').text();
		extraOption2Price = $('#extraOption2').val();

		if (extraOption2IsChecked) {

			extraOption2Price = extraOption2Price * 1;
			$('#extraOption2Sum').html('<a href="javascript:;" id="extraOption2SumReset"><i class="fa fa-times-circle"></i></a> ' + extraOption2Title + '<span class="price">' + extraOption2Price.toFixed(2) + '</span>');
			formatItemPrice();

		} else { // If option in not checked			

			extraOption2Price = 0;
			clearSummaryLine('extraOption2Sum');

		}

		// Update total in order summary		
		total = subSum1 + subSum2 + subSum3 + extraOption1Price + extraOption2Price;
		$('#total').val(total.toFixed(2));
		formatTotalPrice();

	}

	// Function to save actual values with updating the hidden fields
	function saveState() {

		// Update hidden fields with option1Single details
		$('#option1Title').val(singleOption1Title);
		$('#option1Price').val(singleOption1Price);
		$('#subSum1').val(subSum1);

		// Update hidden fields with option2Single details
		$('#option2Title').val(singleOption2Title);
		$('#option2Price').val(singleOption2Price);
		$('#subSum2').val(subSum2);

		// Update hidden fields with option3Single details		
		$('#option3Title').val(singleOption3Title);
		$('#option3Price').val(singleOption3Price);
		$('#subSum3').val(subSum3);

		// Update hidden field total
		$('#totalDue').val(total);

	}

	// Function to clear line in order summary
	function clearSummaryLine(summaryLineName) {

		if (summaryLineName == 'all') {
			$('#option1SingleSum').html('');
			$('#option2SingleSum').html('');
			$('#option3SingleSum').html('');
			$('#extraOption1Sum').html('');
			$('#extraOption2Sum').html('');
		}
		if (summaryLineName == 'option1SingleSum') {
			$('#option1SingleSum').html('');
		}
		if (summaryLineName == 'option2SingleSum') {
			$('#option2SingleSum').html('');
		}
		if (summaryLineName == 'option3SingleSum') {
			$('#option3SingleSum').html('');
		}
		if (summaryLineName == 'extraOption1Sum') {
			$('#extraOption1Sum').html('');
		}
		if (summaryLineName == 'extraOption2Sum') {
			$('#extraOption2Sum').html('');
		}

	}

	// Function to activate a given checkbox
	function activateSingleOption(singleOptionName) {

		if (singleOptionName == 'option1Single') {
			$('#option1Single').prop('checked', true);
		}
		if (singleOptionName == 'option2Single') {
			$('#option2Single').prop('checked', true);
		}
		if (singleOptionName == 'option3Single') {
			$('#option3Single').prop('checked', true);
		}
	}

	// Function to reset the given checkbox
	function resetCheckbox(optionName) {

		if (optionName == 'all') {
			$('#option1Single').prop('checked', false);
			$('#option2Single').prop('checked', false);
			$('#option3Single').prop('checked', false);
			$('#extraOption1').prop('checked', false);
			$('#extraOption2').prop('checked', false);
		}
		if (optionName == 'option1Single') {
			$('#option1Single').prop('checked', false);
		}
		if (optionName == 'option2Single') {
			$('#option2Single').prop('checked', false);
		}
		if (optionName == 'option3Single') {
			$('#option3Single').prop('checked', false);
		}
		if (optionName == 'extraOption1') {
			$('#extraOption1').prop('checked', false);
		}
		if (optionName == 'extraOption2') {
			$('#extraOption2').prop('checked', false);
		}

	}

	// Function to re-validate total price
	function reValidateTotal() {

		$('#total').parsley().validate();
	}

	// Set total title and price initially
	setTotalOnStart();

	// When option1Single is clicked
	$('#option1Single').on('click', function () {
		updateSummary();
		saveState();
		reValidateTotal();
	});

	// When option2Single is clicked
	$('#option2Single').on('click', function () {
		updateSummary();
		saveState();
		reValidateTotal();
	});

	// When option3Single is clicked
	$('#option3Single').on('click', function () {
		updateSummary();
		saveState();
		reValidateTotal();
	});

	// When extraOption1 is checked
	$('#extraOption1').on('click', function () {
		updateSummary();
		saveState();
		reValidateTotal();
	});

	// When extraOption2 is checked
	$('#extraOption2').on('click', function () {
		updateSummary();
		saveState();
		reValidateTotal();
	});

	// Delete line 1 in summary list
	$('#option1SingleSum').delegate('#option1SingleSumReset', 'click', function () {
		clearSummaryLine('option1SingleSum');
		resetCheckbox('option1Single');
		updateSummary();
		saveState();
		reValidateTotal();
	});

	// Delete line 2 in summary list
	$('#option2SingleSum').delegate('#option2SingleSumReset', 'click', function () {
		clearSummaryLine('option2SingleSum');
		resetCheckbox('option2Single');
		updateSummary();
		saveState();
		reValidateTotal();
	});

	// Delete line 3 in summary list
	$('#option3SingleSum').delegate('#option3SingleSumReset', 'click', function () {
		clearSummaryLine('option3SingleSum');
		resetCheckbox('option3Single');
		updateSummary();
		saveState();
		reValidateTotal();
	});

	// Delete line 4 in summary list
	$('#extraOption1Sum').delegate('#extraOption1SumReset', 'click', function () {
		clearSummaryLine('extraOption1Sum');
		resetCheckbox('extraOption1');
		updateSummary();
		saveState();
		reValidateTotal();
	});

	// Delete line 5 in summary list
	$('#extraOption2Sum').delegate('#extraOption2SumReset', 'click', function () {
		clearSummaryLine('extraOption2Sum');
		resetCheckbox('extraOption2');
		updateSummary();
		saveState();
		reValidateTotal();
	});

	// If reset is clicked, set the selected item to default	
	$('#resetBtn').on('click', function () {
		clearSummaryLine('all');
		resetCheckbox('all');
		updateSummary();
		scrollToTop();
	});

	// =====================================================
	//      RANGE SLIDER 1
	// =====================================================	
	var $range = $('#option1SingleRangeSlider'),
		$input = $('#option1SingleQty'),
		instance,
		min = 1,
		max = 100;

	$range.ionRangeSlider({
		skin: 'round',
		type: 'single',
		min: min,
		max: max,
		from: 50,
		hide_min_max: true,
		onStart: function (data) {
			$input.prop('value', data.from);
		},
		onChange: function (data) {
			$input.prop('value', data.from);
			if (!singleOption1IsChecked) {
				activateSingleOption('option1Single');
			}
			updateSummary();
			reValidateTotal();
			saveState();
		}
	});

	instance = $range.data("ionRangeSlider");

	$input.on('input', function () {
		var val = $(this).prop('value');

		// Validate
		if (val < min) {
			val = min;
			$input.val(min);
		} else if (val > max) {
			val = max;
			$input.val(max);
		}

		instance.update({
			from: val
		});

		if (!singleOption1IsChecked) {
			activateSingleOption('option1Single');
		}

		updateSummary();
		reValidateTotal();
		saveState();

	});

	// =====================================================
	//      RANGE SLIDER 2
	// =====================================================	
	var $range2 = $('#option2SingleRangeSlider'),
		$input2 = $('#option2SingleQty'),
		instance2,
		min2 = 0,
		max2 = 50;

	$range2.ionRangeSlider({
		skin: 'round',
		type: 'single',
		min: min2,
		max: max2,
		from: 25,
		step: 5,
		hide_min_max: true,
		onStart: function (data) {
			$input2.prop('value', data.from);
		},
		onChange: function (data) {
			$input2.prop('value', data.from);
			if (!singleOption2IsChecked) {
				activateSingleOption('option2Single');
			}
			updateSummary();
			reValidateTotal();
			saveState();
		}
	});

	instance2 = $range2.data("ionRangeSlider");

	$input2.on('input', function () {
		var val2 = $(this).prop('value');

		// Validate
		if (val2 < min2) {
			val2 = min2;
			$input2.val(min2);
		} else if (val2 > max2) {
			val2 = max2;
			$input2.val(max2);
		}

		instance2.update({
			from: val2
		});

		if (!singleOption2IsChecked) {
			activateSingleOption('option2Single');
		}

		updateSummary();
		reValidateTotal();
		saveState();

	});

	// =====================================================
	//      RANGE SLIDER 3
	// =====================================================	
	var $range3 = $('#option3SingleRangeSlider'),
		$input3 = $('#option3SingleQty'),
		instance3,
		min3 = 0,
		max3 = 100;

	$range3.ionRangeSlider({
		skin: 'round',
		type: 'single',
		min: min3,
		max: max3,
		from: 50,
		step: 10,
		hide_min_max: true,
		onStart: function (data) {
			$input3.prop('value', data.from);
		},
		onChange: function (data) {
			$input3.prop('value', data.from);
			if (!singleOption3IsChecked) {
				activateSingleOption('option3Single');
			}
			updateSummary();
			reValidateTotal();
			saveState();
		}
	});

	instance3 = $range3.data("ionRangeSlider");

	$input3.on('input', function () {
		var val3 = $(this).prop('value');

		// Validate
		if (val3 < min3) {
			val3 = min3;
			$input3.val(min3);
		} else if (val3 > max3) {
			val3 = max3;
			$input3.val(max3);
		}

		instance3.update({
			from: val3
		});

		if (!singleOption3IsChecked) {
			activateSingleOption('option3Single');
		}

		updateSummary();
		reValidateTotal();
		saveState();

	});

	// =====================================================
	//      COUNTRY INPUT
	// =====================================================

	// Autocomplete country field
	var countriesArray = $.map(countries, function (value, key) { return { value: value, data: key }; });
	$('#autocomplete').autocomplete({
		lookup: countriesArray,
		maxHeight: 130
	});

	// =====================================================
	//      FORM INPUT VALIDATION
	// =====================================================

	// Quantity inputs
	$('.qty-input').on('keypress', function (event) {
		if (event.which != 8 && isNaN(String.fromCharCode(event.which))) {
			event.preventDefault();
		}
	});

	$('#optionGroup1Qty').on('keypress', function () {
		selectedItem1Title = $('#optionGroup1List option:selected').text();
		if (selectedItem1Title == chooseItemText) {
			$('#alertModal1').modal();
		}
	});

	$('#optionGroup2Qty').on('keypress', function () {
		selectedItem2Title = $('#optionGroup2List option:selected').text();
		if (selectedItem2Title == chooseItemText) {
			$('#alertModal2').modal();
		}
	});

	$('#optionGroup3Qty').on('keypress', function () {
		selectedItem3Title = $('#optionGroup3List option:selected').text();
		if (selectedItem3Title == chooseItemText) {
			$('#alertModal3').modal();
		}
	});

	// Empty order validation
	window.Parsley.addValidator('emptyOrder', {
		validateString: function (value) {
			return value !== '$ 0.00';
		},
		messages: {
			en: 'Order is empty.'
		}
	});

	// Whole form validation
	$('#orderForm').parsley();

	// =====================================================
	//      AUTOFILL INPUT
	// =====================================================
	$('#autofill').on('click', function () {
		$('#username').val('Mr. Jasper K Peters');
		$('#phone').val('+36301234567');
		$('#address').val('3831 Maloy Court');
		$('#city').val('Hope');
		$('#state').val('Kansas');
		$('#zipcode').val('67451');
		$('#autocomplete').val('United States');
		$('#inputMessage').val('Dear Seller! It is just a test message. Kind Regards!');
	});

	// =====================================================
	//      STYLE SWITCHER
	// =====================================================
	$('#colorPanel').ColorPanel({
		styleSheet: '#cpswitch',
		colors: {
			'#02b843': 'css/style.css',
			'#00cec9': 'css/style.light.green.css',
			'#0984e3': 'css/style.blue.css',
			'#00b7f0': 'css/style.light.blue.css',
			'#fcad1a': 'css/style.yellow.css',
			'#000000': 'css/style.black.css',
		},
		linkClass: 'linka',
		animateContainer: 'body'
	});

})(window.jQuery);