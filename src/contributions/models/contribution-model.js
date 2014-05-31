'use strict';

/**
 * Dependencies
 */
var mongoose = require('mongoose'),
    promiseIt = require('promise-it'),
    Schema = mongoose.Schema,
    /**
     * Enum for types
     */
    types = ['feature', 'issue', 'project'],

    /**
     * Enum for statuses
     */
    statuses = ['open', 'closed'];

var Contribution = new Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    type: {
        type: String,
        enum: types,
        required: true,
        default: 'issue'
    },

    linkTitle: {
        type: String
    },

    link: {
        type: String
    },

    score: {
        type: Number,
        required: true,
        default: 0
    },

    complexityLevel: {
        type: Number,
        required: true,
        default: 1
    },

    status: {
        type: String,
        required: true,
        enum: statuses,
        default: 'open'
    },

    assignees: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]

}, { versionKey: false, id: false });

/**
 * Virtual getter for the userId property
 */
Contribution.virtual('contributionId')
    .get(function () {
        return this._id;
    });

/**
 * Set virtuals during toObject serialization
 */
Contribution.set('toObject', {
    virtuals: true
});

Contribution.statics.findAll = function() {
    var func = this.find().populate({
        path: 'assignees',
        select: 'username userId gravatarId'
    });

    return promiseIt(func.exec, {}, func);
};

Contribution.statics.findById = function(id) {
    return promiseIt(this.findOne, { _id: id }, this);
};

/**
 *
 * @param doc
 * @param ret
 */
Contribution.options.toObject.transform = function (doc, ret) {
    delete ret._id;
};

mongoose.model('Contribution', Contribution);