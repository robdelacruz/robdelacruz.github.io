(function () {
	var origin_url = "http://whateverorigin.org/get?url=";
	var sample_url = "https://www.instagram.com/p/BDqKUeWMOtQ/";

	var $src_url = $("#src_url");
	var $btn_get = $("#btn_get");
	var $btn_clear = $("#btn_clear");
	var $form = $("form");

	var $results_container = $("#results");
	var $target_img = $("#target_img");
	var $target_contents = $('#target_contents');
	var $download_action = $('#download_action');

	$form.submit(function(event) {
		event.preventDefault();

		var src_url_val = $.trim($src_url.val());
		src_url_val = strip_querystr_section(src_url_val);
		if (src_url_val == '') {
			$target_contents.text('Source url needed');
			return;
		}

		var org_btn_get_val = $btn_get.val();
		$btn_get.prop('disabled', true);
		$btn_get.val('Wait...');
		$btn_clear.prop('disabled', true);
		$target_contents.text('Processing...');

		var target_url = origin_url + encodeURIComponent(src_url_val) + "&callback=?";
		$.getJSON(target_url, function(result) {
			var image_url = extract_image_url(result.contents);
			if (image_url) {
				$target_img.attr('src', image_url);

				var image_filename = extract_image_filename(image_url);
				if (image_filename) {
					$target_contents.text('Image found: ' + image_filename);
				} else {
					$target_contents.text("Image found but can't determine image filename.");
					image_filename = 'image.jpg';
				}

				$download_action.css('display', 'block');
				$download_action.attr('href', image_url);
				$download_action.attr('download', image_filename);
			} else {
				var not_found_msg = "No image found";
				$target_contents.text(not_found_msg);
				$target_img.attr('src', '');
				$download_action.css('display', 'none');
			}
		})
		.fail(function() {
			$target_contents.text('Error accessing url');
			$target_img.attr('src', '');
			$download_action.css('display', 'none');
		})
		.always(function() {
			$btn_get.prop('disabled', false);
			$btn_get.val(org_btn_get_val);
			$btn_clear.prop('disabled', false);
			$results_container.css('display', 'block');
		});
	});

	$btn_clear.click(function() {
		$src_url.val('');
		$results_container.css('display', 'none');
		$target_contents.text('');
		$target_img.attr('src', '');
		$download_action.css('display', 'none');
	});

	// Return url without the query string '?parm1=...&parm2=...' section
	function strip_querystr_section(url) {
		return url.split('\?')[0];
	}

	function extract_image_url(page_text) {
		var regex = /<meta property="og:image" content="(.*?)" \/>/;
		var match = regex.exec(page_text);
		if (match == null || match.length < 2) {
			// Image url not found
			return null;
		}

		var image_url = match[1];
		return image_url;
	}

	function extract_image_filename(image_url) {
		var regex = /\/([^\/]+?\.jpg)/;
		var match = regex.exec(image_url);
		if (match == null || match.length < 2) {
			// Can't determine image filename
			return null;
		}

		var image_filename = match[1];
		return image_filename;
	}
})();

