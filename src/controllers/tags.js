"use strict";

var tagsController = {},
	async = require('async'),
	topics = require('./../topics');

tagsController.getTag = function(req, res, next) {
	var tag = req.params.tag;
	var uid = req.user ? req.user.uid : 0;

	topics.getTagTids(tag, 0, 19, function(err, tids) {
		if (err) {
			return next(err);
		}

		if (!tids || !tids.length) {
			topics.deleteTag(tag);
			return res.render('tag', {topics: [], tag:tag});
		}

		topics.getTopics('tag:' + tag + ':topics', uid, tids, function(err, data) {
			if (err) {
				return next(err);
			}
			data.tag = tag;
			res.render('tag', data);
		});
	});
};

tagsController.getTags = function(req, res, next) {
	topics.getTags(0, -1, function(err, tags) {
		if (err) {
			return next(err);
		}

		res.render('tags', {tags: tags});
	});

};

module.exports = tagsController;
