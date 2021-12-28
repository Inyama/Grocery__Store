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

	// Variables for showing prices next to each dropdown item which has price
	var itemPrice = 0;

	// Function to show prices next to each dropdown item which has price
	function showItemPrices(optionGroupListName) {

		if (optionGroupListName == 'optionGroup1List') {
			$('#optionGroup1 .price-list .list li').each(function () {
				itemPrice = $(this).data('value');
				if (itemPrice != 0) { $(this).append('<span class="price">' + itemPrice + '</span>'); }
				formatItemPrice();
			});
		}

	}

	// Function to set total title and price initially
	function setTotalOnStart() {

		$('#totalTitle').val('Total');
		$('#total').val('$ 0.00');

	}

	// Variables for showing the price on the right of the selected dropdown item
	var selectedOptionItem = '';
	var selectedOption = '';
	var selectedItemPrice = 0;

	// Function to show the price on the right of the selected dropdown item
	function showSelectedItemPrice(optionGroupName) {
		selectedOptionItem = $(optionGroupName + ' option:selected');
		selectedOption = selectedOptionItem.text();
		selectedItemPrice = selectedOptionItem.val();

		if (selectedItemPrice != 0) {
			$(optionGroupName + ' .current').html(selectedOption + '<span class="price">' + selectedItemPrice + '</span>');
			formatItemPrice();
		}
	}

	// Variables for calculation
	var chooseItemText = 'Select';

	var selectedItem1Title = '';
	var selectedItem1Price = 0;
	var actualQty1 = 0;
	var subSum1 = 0;

	var total = 0;

	// Function to manage the calculations and update summary
	function updateSummary() {

		// Get the current data from optionGroup1 elements
		selectedItem1Title = $('#optionGroup1List option:selected').text();
		selectedItem1Price = $('#optionGroup1List option:selected').val();
		actualQty1 = $('#optionGroup1Qty').val();
		subSum1 = (selectedItem1Price * 1) * (actualQty1 * 1);

		// Update order summary with optionGroup1 details
		if ((selectedItem1Title != chooseItemText) && (actualQty1 != 0)) {

			$('#optionGroup1Sum').html('<a href="javascript:;" id="optionGroup1SumReset"><i class="fa fa-times-circle"></i></a> ' + selectedItem1Title + ' x ' + actualQty1 + '<span class="price">' + subSum1.toFixed(2) + '</span>');
			formatItemPrice();

		} else { // If optionGroup slider is 0
			clearSummaryLine('optionGroup1Sum');
		}

		// Update total in order summary
		total = subSum1;
		$('#total').val(total.toFixed(2));
		formatTotalPrice();

	}

	// Function to save actual values with updating the hidden fields
	function saveState() {

		// Update hidden fields with optionGroup1 details
		$('#option1Title').val(selectedItem1Title);
		$('#option1Price').val(selectedItem1Price);
		$('#subSum1').val(subSum1);

		// Update hidden field total
		$('#totalDue').val(total);

	}

	// Function to clear line in order summary
	function clearSummaryLine(summaryLineName) {

		if (summaryLineName == 'all') {
			$('#optionGroup1Sum').html('');
		}
		if (summaryLineName == 'optionGroup1Sum') {
			$('#optionGroup1Sum').html('');
		}

	}

	// Function to reset the given dropdown list
	function resetDropdown(optionGroupListName) {

		if (optionGroupListName == 'all') {
			$('#optionGroup1List').val(0).niceSelect('update');
		}
		if (optionGroupListName == 'optionGroup1List') {
			$('#optionGroup1List').val(0).niceSelect('update');
		}

	}

	// Function to re-validate total price
	function reValidateTotal() {

		$('#total').parsley().validate();
	}

	// =====================================================
	//      EVENTS
	// =====================================================

	// When optionGroup1List is changed
	$('#optionGroup1List').on('change', function () {
		showSelectedItemPrice('#optionGroup1');
		updateSummary();
		saveState();
		reValidateTotal();
	});

	// Delete line 1 in summary list
	$('#optionGroup1Sum').delegate('#optionGroup1SumReset', 'click', function () {
		clearSummaryLine('optionGroup1Sum');
		resetDropdown('optionGroup1List');
		showItemPrices('optionGroup1List');
		updateSummary();
		saveState();
		reValidateTotal();
	});

	// If reset is clicked, set the selected item to default	
	$('#resetBtn').on('click', function () {
		clearSummaryLine('all');
		resetDropdown('all');
		updateSummary();
		showItemPrices('optionGroup1List');
		scrollToTop();
	});

	// =====================================================
	//      INIT TOTAL
	// =====================================================		
	setTotalOnStart();

	// =====================================================
	//      INIT DROPDOWNS
	// =====================================================		
	$('select').niceSelect();
	showItemPrices('optionGroup1List');

	// =====================================================
	//      RANGE SLIDER 1
	// =====================================================	
	var $range = $('#optionGroup1RangeSlider'),
		$input = $('#optionGroup1Qty'),
		instance,
		min = 1,
		max = 100;

	$range.ionRangeSlider({
		skin: 'flat',
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
			updateSummary();
			saveState();
		},
		onFinish: function () {
			selectedItem1Title = $('#optionGroup1List option:selected').text();
			if (selectedItem1Title == chooseItemText) {
				$('#alertModal1').modal();
			}
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

		updateSummary();
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