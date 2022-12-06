function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequireaefb"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequireaefb"] = parcelRequire;
}
parcelRequire.register("jDFBk", function(module, exports) {

$parcel$export(module.exports, "SourceMapGenerator", function () { return $e4c1edf176d98c89$export$4d99f7c30e854ff; }, function (v) { return $e4c1edf176d98c89$export$4d99f7c30e854ff = v; });
$parcel$export(module.exports, "SourceMapConsumer", function () { return $e4c1edf176d98c89$export$194e92554d04abdd; }, function (v) { return $e4c1edf176d98c89$export$194e92554d04abdd = v; });
$parcel$export(module.exports, "SourceNode", function () { return $e4c1edf176d98c89$export$7e987e8f375d24c2; }, function (v) { return $e4c1edf176d98c89$export$7e987e8f375d24c2 = v; });
/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */ var $e4c1edf176d98c89$export$4d99f7c30e854ff;
var $e4c1edf176d98c89$export$194e92554d04abdd;
var $e4c1edf176d98c89$export$7e987e8f375d24c2;

$e4c1edf176d98c89$export$4d99f7c30e854ff = (parcelRequire("bIdoD")).SourceMapGenerator;

$e4c1edf176d98c89$export$194e92554d04abdd = (parcelRequire("jWcPZ")).SourceMapConsumer;

$e4c1edf176d98c89$export$7e987e8f375d24c2 = (parcelRequire("6R14p")).SourceNode;

});
parcelRequire.register("bIdoD", function(module, exports) {

$parcel$export(module.exports, "SourceMapGenerator", function () { return $886e3204269838b9$export$4d99f7c30e854ff; }, function (v) { return $886e3204269838b9$export$4d99f7c30e854ff = v; });
var $886e3204269838b9$export$4d99f7c30e854ff;

var $jl8ek = parcelRequire("jl8ek");

var $8E8f3 = parcelRequire("8E8f3");

var $fGIu2 = parcelRequire("fGIu2");
var $886e3204269838b9$require$ArraySet = $fGIu2.ArraySet;

var $6ZVHn = parcelRequire("6ZVHn");
var $886e3204269838b9$require$MappingList = $6ZVHn.MappingList;
/**
 * An instance of the SourceMapGenerator represents a source map which is
 * being built incrementally. You may pass an object with the following
 * properties:
 *
 *   - file: The filename of the generated source.
 *   - sourceRoot: A root for all relative URLs in this source map.
 */ function $886e3204269838b9$var$SourceMapGenerator(aArgs) {
    if (!aArgs) aArgs = {};
    this._file = $8E8f3.getArg(aArgs, "file", null);
    this._sourceRoot = $8E8f3.getArg(aArgs, "sourceRoot", null);
    this._skipValidation = $8E8f3.getArg(aArgs, "skipValidation", false);
    this._sources = new $886e3204269838b9$require$ArraySet();
    this._names = new $886e3204269838b9$require$ArraySet();
    this._mappings = new $886e3204269838b9$require$MappingList();
    this._sourcesContents = null;
}
$886e3204269838b9$var$SourceMapGenerator.prototype._version = 3;
/**
 * Creates a new SourceMapGenerator based on a SourceMapConsumer
 *
 * @param aSourceMapConsumer The SourceMap.
 */ $886e3204269838b9$var$SourceMapGenerator.fromSourceMap = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
    var sourceRoot = aSourceMapConsumer.sourceRoot;
    var generator = new $886e3204269838b9$var$SourceMapGenerator({
        file: aSourceMapConsumer.file,
        sourceRoot: sourceRoot
    });
    aSourceMapConsumer.eachMapping(function(mapping) {
        var newMapping = {
            generated: {
                line: mapping.generatedLine,
                column: mapping.generatedColumn
            }
        };
        if (mapping.source != null) {
            newMapping.source = mapping.source;
            if (sourceRoot != null) newMapping.source = $8E8f3.relative(sourceRoot, newMapping.source);
            newMapping.original = {
                line: mapping.originalLine,
                column: mapping.originalColumn
            };
            if (mapping.name != null) newMapping.name = mapping.name;
        }
        generator.addMapping(newMapping);
    });
    aSourceMapConsumer.sources.forEach(function(sourceFile) {
        var sourceRelative = sourceFile;
        if (sourceRoot !== null) sourceRelative = $8E8f3.relative(sourceRoot, sourceFile);
        if (!generator._sources.has(sourceRelative)) generator._sources.add(sourceRelative);
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) generator.setSourceContent(sourceFile, content);
    });
    return generator;
};
/**
 * Add a single mapping from original source line and column to the generated
 * source's line and column for this source map being created. The mapping
 * object should have the following properties:
 *
 *   - generated: An object with the generated line and column positions.
 *   - original: An object with the original line and column positions.
 *   - source: The original source file (relative to the sourceRoot).
 *   - name: An optional original token name for this mapping.
 */ $886e3204269838b9$var$SourceMapGenerator.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) {
    var generated = $8E8f3.getArg(aArgs, "generated");
    var original = $8E8f3.getArg(aArgs, "original", null);
    var source = $8E8f3.getArg(aArgs, "source", null);
    var name = $8E8f3.getArg(aArgs, "name", null);
    if (!this._skipValidation) this._validateMapping(generated, original, source, name);
    if (source != null) {
        source = String(source);
        if (!this._sources.has(source)) this._sources.add(source);
    }
    if (name != null) {
        name = String(name);
        if (!this._names.has(name)) this._names.add(name);
    }
    this._mappings.add({
        generatedLine: generated.line,
        generatedColumn: generated.column,
        originalLine: original != null && original.line,
        originalColumn: original != null && original.column,
        source: source,
        name: name
    });
};
/**
 * Set the source content for a source file.
 */ $886e3204269838b9$var$SourceMapGenerator.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
    var source = aSourceFile;
    if (this._sourceRoot != null) source = $8E8f3.relative(this._sourceRoot, source);
    if (aSourceContent != null) {
        // Add the source content to the _sourcesContents map.
        // Create a new _sourcesContents map if the property is null.
        if (!this._sourcesContents) this._sourcesContents = Object.create(null);
        this._sourcesContents[$8E8f3.toSetString(source)] = aSourceContent;
    } else if (this._sourcesContents) {
        // Remove the source file from the _sourcesContents map.
        // If the _sourcesContents map is empty, set the property to null.
        delete this._sourcesContents[$8E8f3.toSetString(source)];
        if (Object.keys(this._sourcesContents).length === 0) this._sourcesContents = null;
    }
};
/**
 * Applies the mappings of a sub-source-map for a specific source file to the
 * source map being generated. Each mapping to the supplied source file is
 * rewritten using the supplied source map. Note: The resolution for the
 * resulting mappings is the minimium of this map and the supplied map.
 *
 * @param aSourceMapConsumer The source map to be applied.
 * @param aSourceFile Optional. The filename of the source file.
 *        If omitted, SourceMapConsumer's file property will be used.
 * @param aSourceMapPath Optional. The dirname of the path to the source map
 *        to be applied. If relative, it is relative to the SourceMapConsumer.
 *        This parameter is needed when the two source maps aren't in the same
 *        directory, and the source map to be applied contains relative source
 *        paths. If so, those relative source paths need to be rewritten
 *        relative to the SourceMapGenerator.
 */ $886e3204269838b9$var$SourceMapGenerator.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
    var sourceFile = aSourceFile;
    // If aSourceFile is omitted, we will use the file property of the SourceMap
    if (aSourceFile == null) {
        if (aSourceMapConsumer.file == null) throw new Error('SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map\'s "file" property. Both were omitted.');
        sourceFile = aSourceMapConsumer.file;
    }
    var sourceRoot = this._sourceRoot;
    // Make "sourceFile" relative if an absolute Url is passed.
    if (sourceRoot != null) sourceFile = $8E8f3.relative(sourceRoot, sourceFile);
    // Applying the SourceMap can add and remove items from the sources and
    // the names array.
    var newSources = new $886e3204269838b9$require$ArraySet();
    var newNames = new $886e3204269838b9$require$ArraySet();
    // Find mappings for the "sourceFile"
    this._mappings.unsortedForEach(function(mapping) {
        if (mapping.source === sourceFile && mapping.originalLine != null) {
            // Check if it can be mapped by the source map, then update the mapping.
            var original = aSourceMapConsumer.originalPositionFor({
                line: mapping.originalLine,
                column: mapping.originalColumn
            });
            if (original.source != null) {
                // Copy mapping
                mapping.source = original.source;
                if (aSourceMapPath != null) mapping.source = $8E8f3.join(aSourceMapPath, mapping.source);
                if (sourceRoot != null) mapping.source = $8E8f3.relative(sourceRoot, mapping.source);
                mapping.originalLine = original.line;
                mapping.originalColumn = original.column;
                if (original.name != null) mapping.name = original.name;
            }
        }
        var source = mapping.source;
        if (source != null && !newSources.has(source)) newSources.add(source);
        var name = mapping.name;
        if (name != null && !newNames.has(name)) newNames.add(name);
    }, this);
    this._sources = newSources;
    this._names = newNames;
    // Copy sourcesContents of applied map.
    aSourceMapConsumer.sources.forEach(function(sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
            if (aSourceMapPath != null) sourceFile = $8E8f3.join(aSourceMapPath, sourceFile);
            if (sourceRoot != null) sourceFile = $8E8f3.relative(sourceRoot, sourceFile);
            this.setSourceContent(sourceFile, content);
        }
    }, this);
};
/**
 * A mapping can have one of the three levels of data:
 *
 *   1. Just the generated position.
 *   2. The Generated position, original position, and original source.
 *   3. Generated and original position, original source, as well as a name
 *      token.
 *
 * To maintain consistency, we validate that any new mapping being added falls
 * in to one of these categories.
 */ $886e3204269838b9$var$SourceMapGenerator.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
    // When aOriginal is truthy but has empty values for .line and .column,
    // it is most likely a programmer error. In this case we throw a very
    // specific error message to try to guide them the right way.
    // For example: https://github.com/Polymer/polymer-bundler/pull/519
    if (aOriginal && typeof aOriginal.line !== "number" && typeof aOriginal.column !== "number") throw new Error("original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.");
    if (aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) // Case 1.
    return;
    else if (aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) // Cases 2 and 3.
    return;
    else throw new Error("Invalid mapping: " + JSON.stringify({
        generated: aGenerated,
        source: aSource,
        original: aOriginal,
        name: aName
    }));
};
/**
 * Serialize the accumulated mappings in to the stream of base 64 VLQs
 * specified by the source map format.
 */ $886e3204269838b9$var$SourceMapGenerator.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
    var previousGeneratedColumn = 0;
    var previousGeneratedLine = 1;
    var previousOriginalColumn = 0;
    var previousOriginalLine = 0;
    var previousName = 0;
    var previousSource = 0;
    var result = "";
    var next;
    var mapping;
    var nameIdx;
    var sourceIdx;
    var mappings = this._mappings.toArray();
    for(var i = 0, len = mappings.length; i < len; i++){
        mapping = mappings[i];
        next = "";
        if (mapping.generatedLine !== previousGeneratedLine) {
            previousGeneratedColumn = 0;
            while(mapping.generatedLine !== previousGeneratedLine){
                next += ";";
                previousGeneratedLine++;
            }
        } else if (i > 0) {
            if (!$8E8f3.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) continue;
            next += ",";
        }
        next += $jl8ek.encode(mapping.generatedColumn - previousGeneratedColumn);
        previousGeneratedColumn = mapping.generatedColumn;
        if (mapping.source != null) {
            sourceIdx = this._sources.indexOf(mapping.source);
            next += $jl8ek.encode(sourceIdx - previousSource);
            previousSource = sourceIdx;
            // lines are stored 0-based in SourceMap spec version 3
            next += $jl8ek.encode(mapping.originalLine - 1 - previousOriginalLine);
            previousOriginalLine = mapping.originalLine - 1;
            next += $jl8ek.encode(mapping.originalColumn - previousOriginalColumn);
            previousOriginalColumn = mapping.originalColumn;
            if (mapping.name != null) {
                nameIdx = this._names.indexOf(mapping.name);
                next += $jl8ek.encode(nameIdx - previousName);
                previousName = nameIdx;
            }
        }
        result += next;
    }
    return result;
};
$886e3204269838b9$var$SourceMapGenerator.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
    return aSources.map(function(source) {
        if (!this._sourcesContents) return null;
        if (aSourceRoot != null) source = $8E8f3.relative(aSourceRoot, source);
        var key = $8E8f3.toSetString(source);
        return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
    }, this);
};
/**
 * Externalize the source map.
 */ $886e3204269838b9$var$SourceMapGenerator.prototype.toJSON = function SourceMapGenerator_toJSON() {
    var map = {
        version: this._version,
        sources: this._sources.toArray(),
        names: this._names.toArray(),
        mappings: this._serializeMappings()
    };
    if (this._file != null) map.file = this._file;
    if (this._sourceRoot != null) map.sourceRoot = this._sourceRoot;
    if (this._sourcesContents) map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
    return map;
};
/**
 * Render the source map being generated to a string.
 */ $886e3204269838b9$var$SourceMapGenerator.prototype.toString = function SourceMapGenerator_toString() {
    return JSON.stringify(this.toJSON());
};
$886e3204269838b9$export$4d99f7c30e854ff = $886e3204269838b9$var$SourceMapGenerator;

});
parcelRequire.register("jl8ek", function(module, exports) {

$parcel$export(module.exports, "encode", function () { return $e1465cca52c8dae5$export$c564cdbbe6da493; }, function (v) { return $e1465cca52c8dae5$export$c564cdbbe6da493 = v; });
$parcel$export(module.exports, "decode", function () { return $e1465cca52c8dae5$export$2f872c0f2117be69; }, function (v) { return $e1465cca52c8dae5$export$2f872c0f2117be69 = v; });
/**
 * Returns the base 64 VLQ encoded value.
 */ var $e1465cca52c8dae5$export$c564cdbbe6da493;
/**
 * Decodes the next base 64 VLQ value from the given string and returns the
 * value and the rest of the string via the out parameter.
 */ var $e1465cca52c8dae5$export$2f872c0f2117be69;

var $fiJKd = parcelRequire("fiJKd");
// A single base 64 digit can contain 6 bits of data. For the base 64 variable
// length quantities we use in the source map spec, the first bit is the sign,
// the next four bits are the actual value, and the 6th bit is the
// continuation bit. The continuation bit tells us whether there are more
// digits in this value following this digit.
//
//   Continuation
//   |    Sign
//   |    |
//   V    V
//   101011
var $e1465cca52c8dae5$var$VLQ_BASE_SHIFT = 5;
// binary: 100000
var $e1465cca52c8dae5$var$VLQ_BASE = 1 << $e1465cca52c8dae5$var$VLQ_BASE_SHIFT;
// binary: 011111
var $e1465cca52c8dae5$var$VLQ_BASE_MASK = $e1465cca52c8dae5$var$VLQ_BASE - 1;
// binary: 100000
var $e1465cca52c8dae5$var$VLQ_CONTINUATION_BIT = $e1465cca52c8dae5$var$VLQ_BASE;
/**
 * Converts from a two-complement value to a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
 */ function $e1465cca52c8dae5$var$toVLQSigned(aValue) {
    return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
}
/**
 * Converts to a two-complement value from a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
 */ function $e1465cca52c8dae5$var$fromVLQSigned(aValue) {
    var isNegative = (aValue & 1) === 1;
    var shifted = aValue >> 1;
    return isNegative ? -shifted : shifted;
}
$e1465cca52c8dae5$export$c564cdbbe6da493 = function base64VLQ_encode(aValue) {
    var encoded = "";
    var digit;
    var vlq = $e1465cca52c8dae5$var$toVLQSigned(aValue);
    do {
        digit = vlq & $e1465cca52c8dae5$var$VLQ_BASE_MASK;
        vlq >>>= $e1465cca52c8dae5$var$VLQ_BASE_SHIFT;
        if (vlq > 0) // There are still more digits in this value, so we must make sure the
        // continuation bit is marked.
        digit |= $e1465cca52c8dae5$var$VLQ_CONTINUATION_BIT;
        encoded += $fiJKd.encode(digit);
    }while (vlq > 0);
    return encoded;
};
$e1465cca52c8dae5$export$2f872c0f2117be69 = function base64VLQ_decode(aStr, aIndex, aOutParam) {
    var strLen = aStr.length;
    var result = 0;
    var shift = 0;
    var continuation, digit;
    do {
        if (aIndex >= strLen) throw new Error("Expected more digits in base 64 VLQ value.");
        digit = $fiJKd.decode(aStr.charCodeAt(aIndex++));
        if (digit === -1) throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
        continuation = !!(digit & $e1465cca52c8dae5$var$VLQ_CONTINUATION_BIT);
        digit &= $e1465cca52c8dae5$var$VLQ_BASE_MASK;
        result = result + (digit << shift);
        shift += $e1465cca52c8dae5$var$VLQ_BASE_SHIFT;
    }while (continuation);
    aOutParam.value = $e1465cca52c8dae5$var$fromVLQSigned(result);
    aOutParam.rest = aIndex;
};

});
parcelRequire.register("fiJKd", function(module, exports) {

$parcel$export(module.exports, "encode", function () { return $b23c055d02037eaa$export$c564cdbbe6da493; }, function (v) { return $b23c055d02037eaa$export$c564cdbbe6da493 = v; });
$parcel$export(module.exports, "decode", function () { return $b23c055d02037eaa$export$2f872c0f2117be69; }, function (v) { return $b23c055d02037eaa$export$2f872c0f2117be69 = v; });
/**
 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
 */ var $b23c055d02037eaa$export$c564cdbbe6da493;
/**
 * Decode a single base 64 character code digit to an integer. Returns -1 on
 * failure.
 */ var $b23c055d02037eaa$export$2f872c0f2117be69;
/* -*- Mode: js; js-indent-level: 2; -*- */ /*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */ var $b23c055d02037eaa$var$intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
$b23c055d02037eaa$export$c564cdbbe6da493 = function(number) {
    if (0 <= number && number < $b23c055d02037eaa$var$intToCharMap.length) return $b23c055d02037eaa$var$intToCharMap[number];
    throw new TypeError("Must be between 0 and 63: " + number);
};
$b23c055d02037eaa$export$2f872c0f2117be69 = function(charCode) {
    var bigA = 65; // 'A'
    var bigZ = 90; // 'Z'
    var littleA = 97; // 'a'
    var littleZ = 122; // 'z'
    var zero = 48; // '0'
    var nine = 57; // '9'
    var plus = 43; // '+'
    var slash = 47; // '/'
    var littleOffset = 26;
    var numberOffset = 52;
    // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
    if (bigA <= charCode && charCode <= bigZ) return charCode - bigA;
    // 26 - 51: abcdefghijklmnopqrstuvwxyz
    if (littleA <= charCode && charCode <= littleZ) return charCode - littleA + littleOffset;
    // 52 - 61: 0123456789
    if (zero <= charCode && charCode <= nine) return charCode - zero + numberOffset;
    // 62: +
    if (charCode == plus) return 62;
    // 63: /
    if (charCode == slash) return 63;
    // Invalid base64 digit.
    return -1;
};

});


parcelRequire.register("8E8f3", function(module, exports) {

$parcel$export(module.exports, "getArg", function () { return $64b873c887b63768$export$6e45e70adce70bb2; }, function (v) { return $64b873c887b63768$export$6e45e70adce70bb2 = v; });
$parcel$export(module.exports, "urlParse", function () { return $64b873c887b63768$export$d6e833647f7f5f17; }, function (v) { return $64b873c887b63768$export$d6e833647f7f5f17 = v; });
$parcel$export(module.exports, "isAbsolute", function () { return $64b873c887b63768$export$e434c7255acda994; }, function (v) { return $64b873c887b63768$export$e434c7255acda994 = v; });
$parcel$export(module.exports, "normalize", function () { return $64b873c887b63768$export$a3295358bff77e; }, function (v) { return $64b873c887b63768$export$a3295358bff77e = v; });
$parcel$export(module.exports, "join", function () { return $64b873c887b63768$export$f7e2c8231c57a8bd; }, function (v) { return $64b873c887b63768$export$f7e2c8231c57a8bd = v; });
$parcel$export(module.exports, "relative", function () { return $64b873c887b63768$export$f0e7d1106eeabbe6; }, function (v) { return $64b873c887b63768$export$f0e7d1106eeabbe6 = v; });
$parcel$export(module.exports, "toSetString", function () { return $64b873c887b63768$export$be0fa1163fa7a4c; }, function (v) { return $64b873c887b63768$export$be0fa1163fa7a4c = v; });
$parcel$export(module.exports, "fromSetString", function () { return $64b873c887b63768$export$1fc47c3d4c3302a1; }, function (v) { return $64b873c887b63768$export$1fc47c3d4c3302a1 = v; });
$parcel$export(module.exports, "compareByOriginalPositions", function () { return $64b873c887b63768$export$273077902de92ff2; }, function (v) { return $64b873c887b63768$export$273077902de92ff2 = v; });
$parcel$export(module.exports, "compareByGeneratedPositionsDeflated", function () { return $64b873c887b63768$export$b7acf533941302f6; }, function (v) { return $64b873c887b63768$export$b7acf533941302f6 = v; });
$parcel$export(module.exports, "compareByGeneratedPositionsInflated", function () { return $64b873c887b63768$export$f9c43907549d61f1; }, function (v) { return $64b873c887b63768$export$f9c43907549d61f1 = v; });
$parcel$export(module.exports, "parseSourceMapInput", function () { return $64b873c887b63768$export$b49e2de2ad542732; }, function (v) { return $64b873c887b63768$export$b49e2de2ad542732 = v; });
$parcel$export(module.exports, "computeSourceURL", function () { return $64b873c887b63768$export$659a1aa8f1cdc036; }, function (v) { return $64b873c887b63768$export$659a1aa8f1cdc036 = v; });
var $64b873c887b63768$export$6e45e70adce70bb2;
var $64b873c887b63768$export$d6e833647f7f5f17;
var $64b873c887b63768$export$2ec9abc2d2cac192;
var $64b873c887b63768$export$a3295358bff77e;
var $64b873c887b63768$export$f7e2c8231c57a8bd;
var $64b873c887b63768$export$e434c7255acda994;
var $64b873c887b63768$export$f0e7d1106eeabbe6;
var $64b873c887b63768$export$be0fa1163fa7a4c;
var $64b873c887b63768$export$1fc47c3d4c3302a1;
var $64b873c887b63768$export$273077902de92ff2;
var $64b873c887b63768$export$b7acf533941302f6;
var $64b873c887b63768$export$f9c43907549d61f1;
var $64b873c887b63768$export$b49e2de2ad542732;
var $64b873c887b63768$export$659a1aa8f1cdc036;
/* -*- Mode: js; js-indent-level: 2; -*- */ /*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */ /**
 * This is a helper function for getting values from parameter/options
 * objects.
 *
 * @param args The object we are extracting values from
 * @param name The name of the property we are getting.
 * @param defaultValue An optional value to return if the property is missing
 * from the object. If this is not specified and the property is missing, an
 * error will be thrown.
 */ function $64b873c887b63768$var$getArg(aArgs, aName, aDefaultValue) {
    if (aName in aArgs) return aArgs[aName];
    else if (arguments.length === 3) return aDefaultValue;
    else throw new Error('"' + aName + '" is a required argument.');
}
$64b873c887b63768$export$6e45e70adce70bb2 = $64b873c887b63768$var$getArg;
var $64b873c887b63768$var$urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
var $64b873c887b63768$var$dataUrlRegexp = /^data:.+\,.+$/;
function $64b873c887b63768$var$urlParse(aUrl) {
    var match = aUrl.match($64b873c887b63768$var$urlRegexp);
    if (!match) return null;
    return {
        scheme: match[1],
        auth: match[2],
        host: match[3],
        port: match[4],
        path: match[5]
    };
}
$64b873c887b63768$export$d6e833647f7f5f17 = $64b873c887b63768$var$urlParse;
function $64b873c887b63768$var$urlGenerate(aParsedUrl) {
    var url = "";
    if (aParsedUrl.scheme) url += aParsedUrl.scheme + ":";
    url += "//";
    if (aParsedUrl.auth) url += aParsedUrl.auth + "@";
    if (aParsedUrl.host) url += aParsedUrl.host;
    if (aParsedUrl.port) url += ":" + aParsedUrl.port;
    if (aParsedUrl.path) url += aParsedUrl.path;
    return url;
}
$64b873c887b63768$export$2ec9abc2d2cac192 = $64b873c887b63768$var$urlGenerate;
/**
 * Normalizes a path, or the path portion of a URL:
 *
 * - Replaces consecutive slashes with one slash.
 * - Removes unnecessary '.' parts.
 * - Removes unnecessary '<dir>/..' parts.
 *
 * Based on code in the Node.js 'path' core module.
 *
 * @param aPath The path or url to normalize.
 */ function $64b873c887b63768$var$normalize(aPath) {
    var path = aPath;
    var url = $64b873c887b63768$var$urlParse(aPath);
    if (url) {
        if (!url.path) return aPath;
        path = url.path;
    }
    var isAbsolute = $64b873c887b63768$export$e434c7255acda994(path);
    var parts = path.split(/\/+/);
    for(var part, up = 0, i = parts.length - 1; i >= 0; i--){
        part = parts[i];
        if (part === ".") parts.splice(i, 1);
        else if (part === "..") up++;
        else if (up > 0) {
            if (part === "") {
                // The first part is blank if the path is absolute. Trying to go
                // above the root is a no-op. Therefore we can remove all '..' parts
                // directly after the root.
                parts.splice(i + 1, up);
                up = 0;
            } else {
                parts.splice(i, 2);
                up--;
            }
        }
    }
    path = parts.join("/");
    if (path === "") path = isAbsolute ? "/" : ".";
    if (url) {
        url.path = path;
        return $64b873c887b63768$var$urlGenerate(url);
    }
    return path;
}
$64b873c887b63768$export$a3295358bff77e = $64b873c887b63768$var$normalize;
/**
 * Joins two paths/URLs.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be joined with the root.
 *
 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
 *   first.
 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
 *   is updated with the result and aRoot is returned. Otherwise the result
 *   is returned.
 *   - If aPath is absolute, the result is aPath.
 *   - Otherwise the two paths are joined with a slash.
 * - Joining for example 'http://' and 'www.example.com' is also supported.
 */ function $64b873c887b63768$var$join(aRoot, aPath) {
    if (aRoot === "") aRoot = ".";
    if (aPath === "") aPath = ".";
    var aPathUrl = $64b873c887b63768$var$urlParse(aPath);
    var aRootUrl = $64b873c887b63768$var$urlParse(aRoot);
    if (aRootUrl) aRoot = aRootUrl.path || "/";
    // `join(foo, '//www.example.org')`
    if (aPathUrl && !aPathUrl.scheme) {
        if (aRootUrl) aPathUrl.scheme = aRootUrl.scheme;
        return $64b873c887b63768$var$urlGenerate(aPathUrl);
    }
    if (aPathUrl || aPath.match($64b873c887b63768$var$dataUrlRegexp)) return aPath;
    // `join('http://', 'www.example.com')`
    if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
        aRootUrl.host = aPath;
        return $64b873c887b63768$var$urlGenerate(aRootUrl);
    }
    var joined = aPath.charAt(0) === "/" ? aPath : $64b873c887b63768$var$normalize(aRoot.replace(/\/+$/, "") + "/" + aPath);
    if (aRootUrl) {
        aRootUrl.path = joined;
        return $64b873c887b63768$var$urlGenerate(aRootUrl);
    }
    return joined;
}
$64b873c887b63768$export$f7e2c8231c57a8bd = $64b873c887b63768$var$join;
$64b873c887b63768$export$e434c7255acda994 = function(aPath) {
    return aPath.charAt(0) === "/" || $64b873c887b63768$var$urlRegexp.test(aPath);
};
/**
 * Make a path relative to a URL or another path.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be made relative to aRoot.
 */ function $64b873c887b63768$var$relative(aRoot, aPath) {
    if (aRoot === "") aRoot = ".";
    aRoot = aRoot.replace(/\/$/, "");
    // It is possible for the path to be above the root. In this case, simply
    // checking whether the root is a prefix of the path won't work. Instead, we
    // need to remove components from the root one by one, until either we find
    // a prefix that fits, or we run out of components to remove.
    var level = 0;
    while(aPath.indexOf(aRoot + "/") !== 0){
        var index = aRoot.lastIndexOf("/");
        if (index < 0) return aPath;
        // If the only part of the root that is left is the scheme (i.e. http://,
        // file:///, etc.), one or more slashes (/), or simply nothing at all, we
        // have exhausted all components, so the path is not relative to the root.
        aRoot = aRoot.slice(0, index);
        if (aRoot.match(/^([^\/]+:\/)?\/*$/)) return aPath;
        ++level;
    }
    // Make sure we add a "../" for each component we removed from the root.
    return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
}
$64b873c887b63768$export$f0e7d1106eeabbe6 = $64b873c887b63768$var$relative;
var $64b873c887b63768$var$supportsNullProto = function() {
    var obj = Object.create(null);
    return !("__proto__" in obj);
}();
function $64b873c887b63768$var$identity(s) {
    return s;
}
/**
 * Because behavior goes wacky when you set `__proto__` on objects, we
 * have to prefix all the strings in our set with an arbitrary character.
 *
 * See https://github.com/mozilla/source-map/pull/31 and
 * https://github.com/mozilla/source-map/issues/30
 *
 * @param String aStr
 */ function $64b873c887b63768$var$toSetString(aStr) {
    if ($64b873c887b63768$var$isProtoString(aStr)) return "$" + aStr;
    return aStr;
}
$64b873c887b63768$export$be0fa1163fa7a4c = $64b873c887b63768$var$supportsNullProto ? $64b873c887b63768$var$identity : $64b873c887b63768$var$toSetString;
function $64b873c887b63768$var$fromSetString(aStr) {
    if ($64b873c887b63768$var$isProtoString(aStr)) return aStr.slice(1);
    return aStr;
}
$64b873c887b63768$export$1fc47c3d4c3302a1 = $64b873c887b63768$var$supportsNullProto ? $64b873c887b63768$var$identity : $64b873c887b63768$var$fromSetString;
function $64b873c887b63768$var$isProtoString(s) {
    if (!s) return false;
    var length = s.length;
    if (length < 9 /* "__proto__".length */ ) return false;
    if (s.charCodeAt(length - 1) !== 95 /* '_' */  || s.charCodeAt(length - 2) !== 95 /* '_' */  || s.charCodeAt(length - 3) !== 111 /* 'o' */  || s.charCodeAt(length - 4) !== 116 /* 't' */  || s.charCodeAt(length - 5) !== 111 /* 'o' */  || s.charCodeAt(length - 6) !== 114 /* 'r' */  || s.charCodeAt(length - 7) !== 112 /* 'p' */  || s.charCodeAt(length - 8) !== 95 /* '_' */  || s.charCodeAt(length - 9) !== 95 /* '_' */ ) return false;
    for(var i = length - 10; i >= 0; i--){
        if (s.charCodeAt(i) !== 36 /* '$' */ ) return false;
    }
    return true;
}
/**
 * Comparator between two mappings where the original positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same original source/line/column, but different generated
 * line and column the same. Useful when searching for a mapping with a
 * stubbed out mapping.
 */ function $64b873c887b63768$var$compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
    var cmp = $64b873c887b63768$var$strcmp(mappingA.source, mappingB.source);
    if (cmp !== 0) return cmp;
    cmp = mappingA.originalLine - mappingB.originalLine;
    if (cmp !== 0) return cmp;
    cmp = mappingA.originalColumn - mappingB.originalColumn;
    if (cmp !== 0 || onlyCompareOriginal) return cmp;
    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
    if (cmp !== 0) return cmp;
    cmp = mappingA.generatedLine - mappingB.generatedLine;
    if (cmp !== 0) return cmp;
    return $64b873c887b63768$var$strcmp(mappingA.name, mappingB.name);
}
$64b873c887b63768$export$273077902de92ff2 = $64b873c887b63768$var$compareByOriginalPositions;
/**
 * Comparator between two mappings with deflated source and name indices where
 * the generated positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same generated line and column, but different
 * source/name/original line and column the same. Useful when searching for a
 * mapping with a stubbed out mapping.
 */ function $64b873c887b63768$var$compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
    var cmp = mappingA.generatedLine - mappingB.generatedLine;
    if (cmp !== 0) return cmp;
    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
    if (cmp !== 0 || onlyCompareGenerated) return cmp;
    cmp = $64b873c887b63768$var$strcmp(mappingA.source, mappingB.source);
    if (cmp !== 0) return cmp;
    cmp = mappingA.originalLine - mappingB.originalLine;
    if (cmp !== 0) return cmp;
    cmp = mappingA.originalColumn - mappingB.originalColumn;
    if (cmp !== 0) return cmp;
    return $64b873c887b63768$var$strcmp(mappingA.name, mappingB.name);
}
$64b873c887b63768$export$b7acf533941302f6 = $64b873c887b63768$var$compareByGeneratedPositionsDeflated;
function $64b873c887b63768$var$strcmp(aStr1, aStr2) {
    if (aStr1 === aStr2) return 0;
    if (aStr1 === null) return 1; // aStr2 !== null
    if (aStr2 === null) return -1; // aStr1 !== null
    if (aStr1 > aStr2) return 1;
    return -1;
}
/**
 * Comparator between two mappings with inflated source and name strings where
 * the generated positions are compared.
 */ function $64b873c887b63768$var$compareByGeneratedPositionsInflated(mappingA, mappingB) {
    var cmp = mappingA.generatedLine - mappingB.generatedLine;
    if (cmp !== 0) return cmp;
    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
    if (cmp !== 0) return cmp;
    cmp = $64b873c887b63768$var$strcmp(mappingA.source, mappingB.source);
    if (cmp !== 0) return cmp;
    cmp = mappingA.originalLine - mappingB.originalLine;
    if (cmp !== 0) return cmp;
    cmp = mappingA.originalColumn - mappingB.originalColumn;
    if (cmp !== 0) return cmp;
    return $64b873c887b63768$var$strcmp(mappingA.name, mappingB.name);
}
$64b873c887b63768$export$f9c43907549d61f1 = $64b873c887b63768$var$compareByGeneratedPositionsInflated;
/**
 * Strip any JSON XSSI avoidance prefix from the string (as documented
 * in the source maps specification), and then parse the string as
 * JSON.
 */ function $64b873c887b63768$var$parseSourceMapInput(str) {
    return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
}
$64b873c887b63768$export$b49e2de2ad542732 = $64b873c887b63768$var$parseSourceMapInput;
/**
 * Compute the URL of a source given the the source root, the source's
 * URL, and the source map's URL.
 */ function $64b873c887b63768$var$computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
    sourceURL = sourceURL || "";
    if (sourceRoot) {
        // This follows what Chrome does.
        if (sourceRoot[sourceRoot.length - 1] !== "/" && sourceURL[0] !== "/") sourceRoot += "/";
        // The spec says:
        //   Line 4: An optional source root, useful for relocating source
        //   files on a server or removing repeated values in the
        //   “sources” entry.  This value is prepended to the individual
        //   entries in the “source” field.
        sourceURL = sourceRoot + sourceURL;
    }
    // Historically, SourceMapConsumer did not take the sourceMapURL as
    // a parameter.  This mode is still somewhat supported, which is why
    // this code block is conditional.  However, it's preferable to pass
    // the source map URL to SourceMapConsumer, so that this function
    // can implement the source URL resolution algorithm as outlined in
    // the spec.  This block is basically the equivalent of:
    //    new URL(sourceURL, sourceMapURL).toString()
    // ... except it avoids using URL, which wasn't available in the
    // older releases of node still supported by this library.
    //
    // The spec says:
    //   If the sources are not absolute URLs after prepending of the
    //   “sourceRoot”, the sources are resolved relative to the
    //   SourceMap (like resolving script src in a html document).
    if (sourceMapURL) {
        var parsed = $64b873c887b63768$var$urlParse(sourceMapURL);
        if (!parsed) throw new Error("sourceMapURL could not be parsed");
        if (parsed.path) {
            // Strip the last path component, but keep the "/".
            var index = parsed.path.lastIndexOf("/");
            if (index >= 0) parsed.path = parsed.path.substring(0, index + 1);
        }
        sourceURL = $64b873c887b63768$var$join($64b873c887b63768$var$urlGenerate(parsed), sourceURL);
    }
    return $64b873c887b63768$var$normalize(sourceURL);
}
$64b873c887b63768$export$659a1aa8f1cdc036 = $64b873c887b63768$var$computeSourceURL;

});

parcelRequire.register("fGIu2", function(module, exports) {

$parcel$export(module.exports, "ArraySet", function () { return $b6bd48c44ab2f9dd$export$605bbf5ea7b60ba3; }, function (v) { return $b6bd48c44ab2f9dd$export$605bbf5ea7b60ba3 = v; });
var $b6bd48c44ab2f9dd$export$605bbf5ea7b60ba3;

var $8E8f3 = parcelRequire("8E8f3");
var $b6bd48c44ab2f9dd$var$has = Object.prototype.hasOwnProperty;
var $b6bd48c44ab2f9dd$var$hasNativeMap = typeof Map !== "undefined";
/**
 * A data structure which is a combination of an array and a set. Adding a new
 * member is O(1), testing for membership is O(1), and finding the index of an
 * element is O(1). Removing elements from the set is not supported. Only
 * strings are supported for membership.
 */ function $b6bd48c44ab2f9dd$var$ArraySet() {
    this._array = [];
    this._set = $b6bd48c44ab2f9dd$var$hasNativeMap ? new Map() : Object.create(null);
}
/**
 * Static method for creating ArraySet instances from an existing array.
 */ $b6bd48c44ab2f9dd$var$ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
    var set = new $b6bd48c44ab2f9dd$var$ArraySet();
    for(var i = 0, len = aArray.length; i < len; i++)set.add(aArray[i], aAllowDuplicates);
    return set;
};
/**
 * Return how many unique items are in this ArraySet. If duplicates have been
 * added, than those do not count towards the size.
 *
 * @returns Number
 */ $b6bd48c44ab2f9dd$var$ArraySet.prototype.size = function ArraySet_size() {
    return $b6bd48c44ab2f9dd$var$hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
};
/**
 * Add the given string to this set.
 *
 * @param String aStr
 */ $b6bd48c44ab2f9dd$var$ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
    var sStr = $b6bd48c44ab2f9dd$var$hasNativeMap ? aStr : $8E8f3.toSetString(aStr);
    var isDuplicate = $b6bd48c44ab2f9dd$var$hasNativeMap ? this.has(aStr) : $b6bd48c44ab2f9dd$var$has.call(this._set, sStr);
    var idx = this._array.length;
    if (!isDuplicate || aAllowDuplicates) this._array.push(aStr);
    if (!isDuplicate) {
        if ($b6bd48c44ab2f9dd$var$hasNativeMap) this._set.set(aStr, idx);
        else this._set[sStr] = idx;
    }
};
/**
 * Is the given string a member of this set?
 *
 * @param String aStr
 */ $b6bd48c44ab2f9dd$var$ArraySet.prototype.has = function ArraySet_has(aStr) {
    if ($b6bd48c44ab2f9dd$var$hasNativeMap) return this._set.has(aStr);
    else {
        var sStr = $8E8f3.toSetString(aStr);
        return $b6bd48c44ab2f9dd$var$has.call(this._set, sStr);
    }
};
/**
 * What is the index of the given string in the array?
 *
 * @param String aStr
 */ $b6bd48c44ab2f9dd$var$ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
    if ($b6bd48c44ab2f9dd$var$hasNativeMap) {
        var idx = this._set.get(aStr);
        if (idx >= 0) return idx;
    } else {
        var sStr = $8E8f3.toSetString(aStr);
        if ($b6bd48c44ab2f9dd$var$has.call(this._set, sStr)) return this._set[sStr];
    }
    throw new Error('"' + aStr + '" is not in the set.');
};
/**
 * What is the element at the given index?
 *
 * @param Number aIdx
 */ $b6bd48c44ab2f9dd$var$ArraySet.prototype.at = function ArraySet_at(aIdx) {
    if (aIdx >= 0 && aIdx < this._array.length) return this._array[aIdx];
    throw new Error("No element indexed by " + aIdx);
};
/**
 * Returns the array representation of this set (which has the proper indices
 * indicated by indexOf). Note that this is a copy of the internal array used
 * for storing the members so that no one can mess with internal state.
 */ $b6bd48c44ab2f9dd$var$ArraySet.prototype.toArray = function ArraySet_toArray() {
    return this._array.slice();
};
$b6bd48c44ab2f9dd$export$605bbf5ea7b60ba3 = $b6bd48c44ab2f9dd$var$ArraySet;

});

parcelRequire.register("6ZVHn", function(module, exports) {

$parcel$export(module.exports, "MappingList", function () { return $518532537de5b984$export$e82e0908843dd951; }, function (v) { return $518532537de5b984$export$e82e0908843dd951 = v; });
var $518532537de5b984$export$e82e0908843dd951;

var $8E8f3 = parcelRequire("8E8f3");
/**
 * Determine whether mappingB is after mappingA with respect to generated
 * position.
 */ function $518532537de5b984$var$generatedPositionAfter(mappingA, mappingB) {
    // Optimized for most common case
    var lineA = mappingA.generatedLine;
    var lineB = mappingB.generatedLine;
    var columnA = mappingA.generatedColumn;
    var columnB = mappingB.generatedColumn;
    return lineB > lineA || lineB == lineA && columnB >= columnA || $8E8f3.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
}
/**
 * A data structure to provide a sorted view of accumulated mappings in a
 * performance conscious manner. It trades a neglibable overhead in general
 * case for a large speedup in case of mappings being added in order.
 */ function $518532537de5b984$var$MappingList() {
    this._array = [];
    this._sorted = true;
    // Serves as infimum
    this._last = {
        generatedLine: -1,
        generatedColumn: 0
    };
}
/**
 * Iterate through internal items. This method takes the same arguments that
 * `Array.prototype.forEach` takes.
 *
 * NOTE: The order of the mappings is NOT guaranteed.
 */ $518532537de5b984$var$MappingList.prototype.unsortedForEach = function MappingList_forEach(aCallback, aThisArg) {
    this._array.forEach(aCallback, aThisArg);
};
/**
 * Add the given source mapping.
 *
 * @param Object aMapping
 */ $518532537de5b984$var$MappingList.prototype.add = function MappingList_add(aMapping) {
    if ($518532537de5b984$var$generatedPositionAfter(this._last, aMapping)) {
        this._last = aMapping;
        this._array.push(aMapping);
    } else {
        this._sorted = false;
        this._array.push(aMapping);
    }
};
/**
 * Returns the flat, sorted array of mappings. The mappings are sorted by
 * generated position.
 *
 * WARNING: This method returns internal data without copying, for
 * performance. The return value must NOT be mutated, and should be treated as
 * an immutable borrow. If you want to take ownership, you must make your own
 * copy.
 */ $518532537de5b984$var$MappingList.prototype.toArray = function MappingList_toArray() {
    if (!this._sorted) {
        this._array.sort($8E8f3.compareByGeneratedPositionsInflated);
        this._sorted = true;
    }
    return this._array;
};
$518532537de5b984$export$e82e0908843dd951 = $518532537de5b984$var$MappingList;

});


parcelRequire.register("jWcPZ", function(module, exports) {

$parcel$export(module.exports, "SourceMapConsumer", function () { return $e83d645f81c32708$export$194e92554d04abdd; }, function (v) { return $e83d645f81c32708$export$194e92554d04abdd = v; });
var $e83d645f81c32708$export$194e92554d04abdd;
var $e83d645f81c32708$export$bef6691594139a79;
var $e83d645f81c32708$export$823525094e5b803c;

var $8E8f3 = parcelRequire("8E8f3");

var $2Poek = parcelRequire("2Poek");

var $fGIu2 = parcelRequire("fGIu2");
var $e83d645f81c32708$require$ArraySet = $fGIu2.ArraySet;

var $jl8ek = parcelRequire("jl8ek");

var $d5U2Q = parcelRequire("d5U2Q");
var $e83d645f81c32708$require$quickSort = $d5U2Q.quickSort;
function $e83d645f81c32708$var$SourceMapConsumer(aSourceMap, aSourceMapURL) {
    var sourceMap = aSourceMap;
    if (typeof aSourceMap === "string") sourceMap = $8E8f3.parseSourceMapInput(aSourceMap);
    return sourceMap.sections != null ? new $e83d645f81c32708$var$IndexedSourceMapConsumer(sourceMap, aSourceMapURL) : new $e83d645f81c32708$var$BasicSourceMapConsumer(sourceMap, aSourceMapURL);
}
$e83d645f81c32708$var$SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
    return $e83d645f81c32708$var$BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
};
/**
 * The version of the source mapping spec that we are consuming.
 */ $e83d645f81c32708$var$SourceMapConsumer.prototype._version = 3;
// `__generatedMappings` and `__originalMappings` are arrays that hold the
// parsed mapping coordinates from the source map's "mappings" attribute. They
// are lazily instantiated, accessed via the `_generatedMappings` and
// `_originalMappings` getters respectively, and we only parse the mappings
// and create these arrays once queried for a source location. We jump through
// these hoops because there can be many thousands of mappings, and parsing
// them is expensive, so we only want to do it if we must.
//
// Each object in the arrays is of the form:
//
//     {
//       generatedLine: The line number in the generated code,
//       generatedColumn: The column number in the generated code,
//       source: The path to the original source file that generated this
//               chunk of code,
//       originalLine: The line number in the original source that
//                     corresponds to this chunk of generated code,
//       originalColumn: The column number in the original source that
//                       corresponds to this chunk of generated code,
//       name: The name of the original symbol which generated this chunk of
//             code.
//     }
//
// All properties except for `generatedLine` and `generatedColumn` can be
// `null`.
//
// `_generatedMappings` is ordered by the generated positions.
//
// `_originalMappings` is ordered by the original positions.
$e83d645f81c32708$var$SourceMapConsumer.prototype.__generatedMappings = null;
Object.defineProperty($e83d645f81c32708$var$SourceMapConsumer.prototype, "_generatedMappings", {
    configurable: true,
    enumerable: true,
    get: function get() {
        if (!this.__generatedMappings) this._parseMappings(this._mappings, this.sourceRoot);
        return this.__generatedMappings;
    }
});
$e83d645f81c32708$var$SourceMapConsumer.prototype.__originalMappings = null;
Object.defineProperty($e83d645f81c32708$var$SourceMapConsumer.prototype, "_originalMappings", {
    configurable: true,
    enumerable: true,
    get: function get() {
        if (!this.__originalMappings) this._parseMappings(this._mappings, this.sourceRoot);
        return this.__originalMappings;
    }
});
$e83d645f81c32708$var$SourceMapConsumer.prototype._charIsMappingSeparator = function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
    var c = aStr.charAt(index);
    return c === ";" || c === ",";
};
/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */ $e83d645f81c32708$var$SourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    throw new Error("Subclasses must implement _parseMappings");
};
$e83d645f81c32708$var$SourceMapConsumer.GENERATED_ORDER = 1;
$e83d645f81c32708$var$SourceMapConsumer.ORIGINAL_ORDER = 2;
$e83d645f81c32708$var$SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
$e83d645f81c32708$var$SourceMapConsumer.LEAST_UPPER_BOUND = 2;
/**
 * Iterate over each mapping between an original source/line/column and a
 * generated line/column in this source map.
 *
 * @param Function aCallback
 *        The function that is called with each mapping.
 * @param Object aContext
 *        Optional. If specified, this object will be the value of `this` every
 *        time that `aCallback` is called.
 * @param aOrder
 *        Either `SourceMapConsumer.GENERATED_ORDER` or
 *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
 *        iterate over the mappings sorted by the generated file's line/column
 *        order or the original's source/line/column order, respectively. Defaults to
 *        `SourceMapConsumer.GENERATED_ORDER`.
 */ $e83d645f81c32708$var$SourceMapConsumer.prototype.eachMapping = function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
    var context = aContext || null;
    var order = aOrder || $e83d645f81c32708$var$SourceMapConsumer.GENERATED_ORDER;
    var mappings;
    switch(order){
        case $e83d645f81c32708$var$SourceMapConsumer.GENERATED_ORDER:
            mappings = this._generatedMappings;
            break;
        case $e83d645f81c32708$var$SourceMapConsumer.ORIGINAL_ORDER:
            mappings = this._originalMappings;
            break;
        default:
            throw new Error("Unknown order of iteration.");
    }
    var sourceRoot = this.sourceRoot;
    mappings.map(function(mapping) {
        var source = mapping.source === null ? null : this._sources.at(mapping.source);
        source = $8E8f3.computeSourceURL(sourceRoot, source, this._sourceMapURL);
        return {
            source: source,
            generatedLine: mapping.generatedLine,
            generatedColumn: mapping.generatedColumn,
            originalLine: mapping.originalLine,
            originalColumn: mapping.originalColumn,
            name: mapping.name === null ? null : this._names.at(mapping.name)
        };
    }, this).forEach(aCallback, context);
};
/**
 * Returns all generated line and column information for the original source,
 * line, and column provided. If no column is provided, returns all mappings
 * corresponding to a either the line we are searching for or the next
 * closest line that has any mappings. Otherwise, returns all mappings
 * corresponding to the given line and either the column we are searching for
 * or the next closest column that has any offsets.
 *
 * The only argument is an object with the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number is 1-based.
 *   - column: Optional. the column number in the original source.
 *    The column number is 0-based.
 *
 * and an array of objects is returned, each with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *    line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *    The column number is 0-based.
 */ $e83d645f81c32708$var$SourceMapConsumer.prototype.allGeneratedPositionsFor = function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
    var line = $8E8f3.getArg(aArgs, "line");
    // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
    // returns the index of the closest mapping less than the needle. By
    // setting needle.originalColumn to 0, we thus find the last mapping for
    // the given line, provided such a mapping exists.
    var needle = {
        source: $8E8f3.getArg(aArgs, "source"),
        originalLine: line,
        originalColumn: $8E8f3.getArg(aArgs, "column", 0)
    };
    needle.source = this._findSourceIndex(needle.source);
    if (needle.source < 0) return [];
    var mappings = [];
    var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", $8E8f3.compareByOriginalPositions, $2Poek.LEAST_UPPER_BOUND);
    if (index >= 0) {
        var mapping = this._originalMappings[index];
        if (aArgs.column === undefined) {
            var originalLine = mapping.originalLine;
            // Iterate until either we run out of mappings, or we run into
            // a mapping for a different line than the one we found. Since
            // mappings are sorted, this is guaranteed to find all mappings for
            // the line we found.
            while(mapping && mapping.originalLine === originalLine){
                mappings.push({
                    line: $8E8f3.getArg(mapping, "generatedLine", null),
                    column: $8E8f3.getArg(mapping, "generatedColumn", null),
                    lastColumn: $8E8f3.getArg(mapping, "lastGeneratedColumn", null)
                });
                mapping = this._originalMappings[++index];
            }
        } else {
            var originalColumn = mapping.originalColumn;
            // Iterate until either we run out of mappings, or we run into
            // a mapping for a different line than the one we were searching for.
            // Since mappings are sorted, this is guaranteed to find all mappings for
            // the line we are searching for.
            while(mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn){
                mappings.push({
                    line: $8E8f3.getArg(mapping, "generatedLine", null),
                    column: $8E8f3.getArg(mapping, "generatedColumn", null),
                    lastColumn: $8E8f3.getArg(mapping, "lastGeneratedColumn", null)
                });
                mapping = this._originalMappings[++index];
            }
        }
    }
    return mappings;
};
$e83d645f81c32708$export$194e92554d04abdd = $e83d645f81c32708$var$SourceMapConsumer;
/**
 * A BasicSourceMapConsumer instance represents a parsed source map which we can
 * query for information about the original file positions by giving it a file
 * position in the generated source.
 *
 * The first parameter is the raw source map (either as a JSON string, or
 * already parsed to an object). According to the spec, source maps have the
 * following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - sources: An array of URLs to the original source files.
 *   - names: An array of identifiers which can be referrenced by individual mappings.
 *   - sourceRoot: Optional. The URL root from which all sources are relative.
 *   - sourcesContent: Optional. An array of contents of the original source files.
 *   - mappings: A string of base64 VLQs which contain the actual mappings.
 *   - file: Optional. The generated file this source map is associated with.
 *
 * Here is an example source map, taken from the source map spec[0]:
 *
 *     {
 *       version : 3,
 *       file: "out.js",
 *       sourceRoot : "",
 *       sources: ["foo.js", "bar.js"],
 *       names: ["src", "maps", "are", "fun"],
 *       mappings: "AA,AB;;ABCDE;"
 *     }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
 */ function $e83d645f81c32708$var$BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
    var sourceMap = aSourceMap;
    if (typeof aSourceMap === "string") sourceMap = $8E8f3.parseSourceMapInput(aSourceMap);
    var version = $8E8f3.getArg(sourceMap, "version");
    var sources = $8E8f3.getArg(sourceMap, "sources");
    // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
    // requires the array) to play nice here.
    var names = $8E8f3.getArg(sourceMap, "names", []);
    var sourceRoot = $8E8f3.getArg(sourceMap, "sourceRoot", null);
    var sourcesContent = $8E8f3.getArg(sourceMap, "sourcesContent", null);
    var mappings = $8E8f3.getArg(sourceMap, "mappings");
    var file = $8E8f3.getArg(sourceMap, "file", null);
    // Once again, Sass deviates from the spec and supplies the version as a
    // string rather than a number, so we use loose equality checking here.
    if (version != this._version) throw new Error("Unsupported version: " + version);
    if (sourceRoot) sourceRoot = $8E8f3.normalize(sourceRoot);
    sources = sources.map(String)// Some source maps produce relative source paths like "./foo.js" instead of
    // "foo.js".  Normalize these first so that future comparisons will succeed.
    // See bugzil.la/1090768.
    .map($8E8f3.normalize)// Always ensure that absolute sources are internally stored relative to
    // the source root, if the source root is absolute. Not doing this would
    // be particularly problematic when the source root is a prefix of the
    // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
    .map(function(source) {
        return sourceRoot && $8E8f3.isAbsolute(sourceRoot) && $8E8f3.isAbsolute(source) ? $8E8f3.relative(sourceRoot, source) : source;
    });
    // Pass `true` below to allow duplicate names and sources. While source maps
    // are intended to be compressed and deduplicated, the TypeScript compiler
    // sometimes generates source maps with duplicates in them. See Github issue
    // #72 and bugzil.la/889492.
    this._names = $e83d645f81c32708$require$ArraySet.fromArray(names.map(String), true);
    this._sources = $e83d645f81c32708$require$ArraySet.fromArray(sources, true);
    this._absoluteSources = this._sources.toArray().map(function(s) {
        return $8E8f3.computeSourceURL(sourceRoot, s, aSourceMapURL);
    });
    this.sourceRoot = sourceRoot;
    this.sourcesContent = sourcesContent;
    this._mappings = mappings;
    this._sourceMapURL = aSourceMapURL;
    this.file = file;
}
$e83d645f81c32708$var$BasicSourceMapConsumer.prototype = Object.create($e83d645f81c32708$var$SourceMapConsumer.prototype);
$e83d645f81c32708$var$BasicSourceMapConsumer.prototype.consumer = $e83d645f81c32708$var$SourceMapConsumer;
/**
 * Utility function to find the index of a source.  Returns -1 if not
 * found.
 */ $e83d645f81c32708$var$BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
    var relativeSource = aSource;
    if (this.sourceRoot != null) relativeSource = $8E8f3.relative(this.sourceRoot, relativeSource);
    if (this._sources.has(relativeSource)) return this._sources.indexOf(relativeSource);
    // Maybe aSource is an absolute URL as returned by |sources|.  In
    // this case we can't simply undo the transform.
    var i;
    for(i = 0; i < this._absoluteSources.length; ++i){
        if (this._absoluteSources[i] == aSource) return i;
    }
    return -1;
};
/**
 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
 *
 * @param SourceMapGenerator aSourceMap
 *        The source map that will be consumed.
 * @param String aSourceMapURL
 *        The URL at which the source map can be found (optional)
 * @returns BasicSourceMapConsumer
 */ $e83d645f81c32708$var$BasicSourceMapConsumer.fromSourceMap = function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
    var smc = Object.create($e83d645f81c32708$var$BasicSourceMapConsumer.prototype);
    var names = smc._names = $e83d645f81c32708$require$ArraySet.fromArray(aSourceMap._names.toArray(), true);
    var sources = smc._sources = $e83d645f81c32708$require$ArraySet.fromArray(aSourceMap._sources.toArray(), true);
    smc.sourceRoot = aSourceMap._sourceRoot;
    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(), smc.sourceRoot);
    smc.file = aSourceMap._file;
    smc._sourceMapURL = aSourceMapURL;
    smc._absoluteSources = smc._sources.toArray().map(function(s) {
        return $8E8f3.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
    });
    // Because we are modifying the entries (by converting string sources and
    // names to indices into the sources and names ArraySets), we have to make
    // a copy of the entry or else bad things happen. Shared mutable state
    // strikes again! See github issue #191.
    var generatedMappings = aSourceMap._mappings.toArray().slice();
    var destGeneratedMappings = smc.__generatedMappings = [];
    var destOriginalMappings = smc.__originalMappings = [];
    for(var i = 0, length = generatedMappings.length; i < length; i++){
        var srcMapping = generatedMappings[i];
        var destMapping = new $e83d645f81c32708$var$Mapping;
        destMapping.generatedLine = srcMapping.generatedLine;
        destMapping.generatedColumn = srcMapping.generatedColumn;
        if (srcMapping.source) {
            destMapping.source = sources.indexOf(srcMapping.source);
            destMapping.originalLine = srcMapping.originalLine;
            destMapping.originalColumn = srcMapping.originalColumn;
            if (srcMapping.name) destMapping.name = names.indexOf(srcMapping.name);
            destOriginalMappings.push(destMapping);
        }
        destGeneratedMappings.push(destMapping);
    }
    $e83d645f81c32708$require$quickSort(smc.__originalMappings, $8E8f3.compareByOriginalPositions);
    return smc;
};
/**
 * The version of the source mapping spec that we are consuming.
 */ $e83d645f81c32708$var$BasicSourceMapConsumer.prototype._version = 3;
/**
 * The list of original sources.
 */ Object.defineProperty($e83d645f81c32708$var$BasicSourceMapConsumer.prototype, "sources", {
    get: function get() {
        return this._absoluteSources.slice();
    }
});
/**
 * Provide the JIT with a nice shape / hidden class.
 */ function $e83d645f81c32708$var$Mapping() {
    this.generatedLine = 0;
    this.generatedColumn = 0;
    this.source = null;
    this.originalLine = null;
    this.originalColumn = null;
    this.name = null;
}
/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */ $e83d645f81c32708$var$BasicSourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    var generatedLine = 1;
    var previousGeneratedColumn = 0;
    var previousOriginalLine = 0;
    var previousOriginalColumn = 0;
    var previousSource = 0;
    var previousName = 0;
    var length = aStr.length;
    var index = 0;
    var cachedSegments = {};
    var temp = {};
    var originalMappings = [];
    var generatedMappings = [];
    var mapping, str, segment, end, value;
    while(index < length){
        if (aStr.charAt(index) === ";") {
            generatedLine++;
            index++;
            previousGeneratedColumn = 0;
        } else if (aStr.charAt(index) === ",") index++;
        else {
            mapping = new $e83d645f81c32708$var$Mapping();
            mapping.generatedLine = generatedLine;
            // Because each offset is encoded relative to the previous one,
            // many segments often have the same encoding. We can exploit this
            // fact by caching the parsed variable length fields of each segment,
            // allowing us to avoid a second parse if we encounter the same
            // segment again.
            for(end = index; end < length; end++){
                if (this._charIsMappingSeparator(aStr, end)) break;
            }
            str = aStr.slice(index, end);
            segment = cachedSegments[str];
            if (segment) index += str.length;
            else {
                segment = [];
                while(index < end){
                    $jl8ek.decode(aStr, index, temp);
                    value = temp.value;
                    index = temp.rest;
                    segment.push(value);
                }
                if (segment.length === 2) throw new Error("Found a source, but no line and column");
                if (segment.length === 3) throw new Error("Found a source and line, but no column");
                cachedSegments[str] = segment;
            }
            // Generated column.
            mapping.generatedColumn = previousGeneratedColumn + segment[0];
            previousGeneratedColumn = mapping.generatedColumn;
            if (segment.length > 1) {
                // Original source.
                mapping.source = previousSource + segment[1];
                previousSource += segment[1];
                // Original line.
                mapping.originalLine = previousOriginalLine + segment[2];
                previousOriginalLine = mapping.originalLine;
                // Lines are stored 0-based
                mapping.originalLine += 1;
                // Original column.
                mapping.originalColumn = previousOriginalColumn + segment[3];
                previousOriginalColumn = mapping.originalColumn;
                if (segment.length > 4) {
                    // Original name.
                    mapping.name = previousName + segment[4];
                    previousName += segment[4];
                }
            }
            generatedMappings.push(mapping);
            if (typeof mapping.originalLine === "number") originalMappings.push(mapping);
        }
    }
    $e83d645f81c32708$require$quickSort(generatedMappings, $8E8f3.compareByGeneratedPositionsDeflated);
    this.__generatedMappings = generatedMappings;
    $e83d645f81c32708$require$quickSort(originalMappings, $8E8f3.compareByOriginalPositions);
    this.__originalMappings = originalMappings;
};
/**
 * Find the mapping that best matches the hypothetical "needle" mapping that
 * we are searching for in the given "haystack" of mappings.
 */ $e83d645f81c32708$var$BasicSourceMapConsumer.prototype._findMapping = function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
    // To return the position we are searching for, we must first find the
    // mapping for the given position and then return the opposite position it
    // points to. Because the mappings are sorted, we can use binary search to
    // find the best mapping.
    if (aNeedle[aLineName] <= 0) throw new TypeError("Line must be greater than or equal to 1, got " + aNeedle[aLineName]);
    if (aNeedle[aColumnName] < 0) throw new TypeError("Column must be greater than or equal to 0, got " + aNeedle[aColumnName]);
    return $2Poek.search(aNeedle, aMappings, aComparator, aBias);
};
/**
 * Compute the last column for each generated mapping. The last column is
 * inclusive.
 */ $e83d645f81c32708$var$BasicSourceMapConsumer.prototype.computeColumnSpans = function SourceMapConsumer_computeColumnSpans() {
    for(var index = 0; index < this._generatedMappings.length; ++index){
        var mapping = this._generatedMappings[index];
        // Mappings do not contain a field for the last generated columnt. We
        // can come up with an optimistic estimate, however, by assuming that
        // mappings are contiguous (i.e. given two consecutive mappings, the
        // first mapping ends where the second one starts).
        if (index + 1 < this._generatedMappings.length) {
            var nextMapping = this._generatedMappings[index + 1];
            if (mapping.generatedLine === nextMapping.generatedLine) {
                mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
                continue;
            }
        }
        // The last mapping for each line spans the entire line.
        mapping.lastGeneratedColumn = Infinity;
    }
};
/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */ $e83d645f81c32708$var$BasicSourceMapConsumer.prototype.originalPositionFor = function SourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
        generatedLine: $8E8f3.getArg(aArgs, "line"),
        generatedColumn: $8E8f3.getArg(aArgs, "column")
    };
    var index = this._findMapping(needle, this._generatedMappings, "generatedLine", "generatedColumn", $8E8f3.compareByGeneratedPositionsDeflated, $8E8f3.getArg(aArgs, "bias", $e83d645f81c32708$var$SourceMapConsumer.GREATEST_LOWER_BOUND));
    if (index >= 0) {
        var mapping = this._generatedMappings[index];
        if (mapping.generatedLine === needle.generatedLine) {
            var source = $8E8f3.getArg(mapping, "source", null);
            if (source !== null) {
                source = this._sources.at(source);
                source = $8E8f3.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
            }
            var name = $8E8f3.getArg(mapping, "name", null);
            if (name !== null) name = this._names.at(name);
            return {
                source: source,
                line: $8E8f3.getArg(mapping, "originalLine", null),
                column: $8E8f3.getArg(mapping, "originalColumn", null),
                name: name
            };
        }
    }
    return {
        source: null,
        line: null,
        column: null,
        name: null
    };
};
/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */ $e83d645f81c32708$var$BasicSourceMapConsumer.prototype.hasContentsOfAllSources = function BasicSourceMapConsumer_hasContentsOfAllSources() {
    if (!this.sourcesContent) return false;
    return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(sc) {
        return sc == null;
    });
};
/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */ $e83d645f81c32708$var$BasicSourceMapConsumer.prototype.sourceContentFor = function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    if (!this.sourcesContent) return null;
    var index = this._findSourceIndex(aSource);
    if (index >= 0) return this.sourcesContent[index];
    var relativeSource = aSource;
    if (this.sourceRoot != null) relativeSource = $8E8f3.relative(this.sourceRoot, relativeSource);
    var url;
    if (this.sourceRoot != null && (url = $8E8f3.urlParse(this.sourceRoot))) {
        // XXX: file:// URIs and absolute paths lead to unexpected behavior for
        // many users. We can help them out when they expect file:// URIs to
        // behave like it would if they were running a local HTTP server. See
        // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
        var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
        if (url.scheme == "file" && this._sources.has(fileUriAbsPath)) return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
        if ((!url.path || url.path == "/") && this._sources.has("/" + relativeSource)) return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
    }
    // This function is used recursively from
    // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
    // don't want to throw if we can't find the source - we just want to
    // return null, so we provide a flag to exit gracefully.
    if (nullOnMissing) return null;
    else throw new Error('"' + relativeSource + '" is not in the SourceMap.');
};
/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */ $e83d645f81c32708$var$BasicSourceMapConsumer.prototype.generatedPositionFor = function SourceMapConsumer_generatedPositionFor(aArgs) {
    var source = $8E8f3.getArg(aArgs, "source");
    source = this._findSourceIndex(source);
    if (source < 0) return {
        line: null,
        column: null,
        lastColumn: null
    };
    var needle = {
        source: source,
        originalLine: $8E8f3.getArg(aArgs, "line"),
        originalColumn: $8E8f3.getArg(aArgs, "column")
    };
    var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", $8E8f3.compareByOriginalPositions, $8E8f3.getArg(aArgs, "bias", $e83d645f81c32708$var$SourceMapConsumer.GREATEST_LOWER_BOUND));
    if (index >= 0) {
        var mapping = this._originalMappings[index];
        if (mapping.source === needle.source) return {
            line: $8E8f3.getArg(mapping, "generatedLine", null),
            column: $8E8f3.getArg(mapping, "generatedColumn", null),
            lastColumn: $8E8f3.getArg(mapping, "lastGeneratedColumn", null)
        };
    }
    return {
        line: null,
        column: null,
        lastColumn: null
    };
};
$e83d645f81c32708$export$bef6691594139a79 = $e83d645f81c32708$var$BasicSourceMapConsumer;
/**
 * An IndexedSourceMapConsumer instance represents a parsed source map which
 * we can query for information. It differs from BasicSourceMapConsumer in
 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
 * input.
 *
 * The first parameter is a raw source map (either as a JSON string, or already
 * parsed to an object). According to the spec for indexed source maps, they
 * have the following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - file: Optional. The generated file this source map is associated with.
 *   - sections: A list of section definitions.
 *
 * Each value under the "sections" field has two fields:
 *   - offset: The offset into the original specified at which this section
 *       begins to apply, defined as an object with a "line" and "column"
 *       field.
 *   - map: A source map definition. This source map could also be indexed,
 *       but doesn't have to be.
 *
 * Instead of the "map" field, it's also possible to have a "url" field
 * specifying a URL to retrieve a source map from, but that's currently
 * unsupported.
 *
 * Here's an example source map, taken from the source map spec[0], but
 * modified to omit a section which uses the "url" field.
 *
 *  {
 *    version : 3,
 *    file: "app.js",
 *    sections: [{
 *      offset: {line:100, column:10},
 *      map: {
 *        version : 3,
 *        file: "section.js",
 *        sources: ["foo.js", "bar.js"],
 *        names: ["src", "maps", "are", "fun"],
 *        mappings: "AAAA,E;;ABCDE;"
 *      }
 *    }],
 *  }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
 */ function $e83d645f81c32708$var$IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
    var sourceMap = aSourceMap;
    if (typeof aSourceMap === "string") sourceMap = $8E8f3.parseSourceMapInput(aSourceMap);
    var version = $8E8f3.getArg(sourceMap, "version");
    var sections = $8E8f3.getArg(sourceMap, "sections");
    if (version != this._version) throw new Error("Unsupported version: " + version);
    this._sources = new $e83d645f81c32708$require$ArraySet();
    this._names = new $e83d645f81c32708$require$ArraySet();
    var lastOffset = {
        line: -1,
        column: 0
    };
    this._sections = sections.map(function(s) {
        if (s.url) // The url field will require support for asynchronicity.
        // See https://github.com/mozilla/source-map/issues/16
        throw new Error("Support for url field in sections not implemented.");
        var offset = $8E8f3.getArg(s, "offset");
        var offsetLine = $8E8f3.getArg(offset, "line");
        var offsetColumn = $8E8f3.getArg(offset, "column");
        if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) throw new Error("Section offsets must be ordered and non-overlapping.");
        lastOffset = offset;
        return {
            generatedOffset: {
                // The offset fields are 0-based, but we use 1-based indices when
                // encoding/decoding from VLQ.
                generatedLine: offsetLine + 1,
                generatedColumn: offsetColumn + 1
            },
            consumer: new $e83d645f81c32708$var$SourceMapConsumer($8E8f3.getArg(s, "map"), aSourceMapURL)
        };
    });
}
$e83d645f81c32708$var$IndexedSourceMapConsumer.prototype = Object.create($e83d645f81c32708$var$SourceMapConsumer.prototype);
$e83d645f81c32708$var$IndexedSourceMapConsumer.prototype.constructor = $e83d645f81c32708$var$SourceMapConsumer;
/**
 * The version of the source mapping spec that we are consuming.
 */ $e83d645f81c32708$var$IndexedSourceMapConsumer.prototype._version = 3;
/**
 * The list of original sources.
 */ Object.defineProperty($e83d645f81c32708$var$IndexedSourceMapConsumer.prototype, "sources", {
    get: function get() {
        var sources = [];
        for(var i = 0; i < this._sections.length; i++)for(var j = 0; j < this._sections[i].consumer.sources.length; j++)sources.push(this._sections[i].consumer.sources[j]);
        return sources;
    }
});
/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */ $e83d645f81c32708$var$IndexedSourceMapConsumer.prototype.originalPositionFor = function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
        generatedLine: $8E8f3.getArg(aArgs, "line"),
        generatedColumn: $8E8f3.getArg(aArgs, "column")
    };
    // Find the section containing the generated position we're trying to map
    // to an original position.
    var sectionIndex = $2Poek.search(needle, this._sections, function(needle, section) {
        var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
        if (cmp) return cmp;
        return needle.generatedColumn - section.generatedOffset.generatedColumn;
    });
    var section = this._sections[sectionIndex];
    if (!section) return {
        source: null,
        line: null,
        column: null,
        name: null
    };
    return section.consumer.originalPositionFor({
        line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
        column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
        bias: aArgs.bias
    });
};
/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */ $e83d645f81c32708$var$IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = function IndexedSourceMapConsumer_hasContentsOfAllSources() {
    return this._sections.every(function(s) {
        return s.consumer.hasContentsOfAllSources();
    });
};
/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */ $e83d645f81c32708$var$IndexedSourceMapConsumer.prototype.sourceContentFor = function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    for(var i = 0; i < this._sections.length; i++){
        var section = this._sections[i];
        var content = section.consumer.sourceContentFor(aSource, true);
        if (content) return content;
    }
    if (nullOnMissing) return null;
    else throw new Error('"' + aSource + '" is not in the SourceMap.');
};
/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based. 
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */ $e83d645f81c32708$var$IndexedSourceMapConsumer.prototype.generatedPositionFor = function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
    for(var i = 0; i < this._sections.length; i++){
        var section = this._sections[i];
        // Only consider this section if the requested source is in the list of
        // sources of the consumer.
        if (section.consumer._findSourceIndex($8E8f3.getArg(aArgs, "source")) === -1) continue;
        var generatedPosition = section.consumer.generatedPositionFor(aArgs);
        if (generatedPosition) {
            var ret = {
                line: generatedPosition.line + (section.generatedOffset.generatedLine - 1),
                column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0)
            };
            return ret;
        }
    }
    return {
        line: null,
        column: null
    };
};
/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */ $e83d645f81c32708$var$IndexedSourceMapConsumer.prototype._parseMappings = function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    this.__generatedMappings = [];
    this.__originalMappings = [];
    for(var i = 0; i < this._sections.length; i++){
        var section = this._sections[i];
        var sectionMappings = section.consumer._generatedMappings;
        for(var j = 0; j < sectionMappings.length; j++){
            var mapping = sectionMappings[j];
            var source = section.consumer._sources.at(mapping.source);
            source = $8E8f3.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
            this._sources.add(source);
            source = this._sources.indexOf(source);
            var name = null;
            if (mapping.name) {
                name = section.consumer._names.at(mapping.name);
                this._names.add(name);
                name = this._names.indexOf(name);
            }
            // The mappings coming from the consumer for the section have
            // generated positions relative to the start of the section, so we
            // need to offset them to be relative to the start of the concatenated
            // generated file.
            var adjustedMapping = {
                source: source,
                generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
                generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
                originalLine: mapping.originalLine,
                originalColumn: mapping.originalColumn,
                name: name
            };
            this.__generatedMappings.push(adjustedMapping);
            if (typeof adjustedMapping.originalLine === "number") this.__originalMappings.push(adjustedMapping);
        }
    }
    $e83d645f81c32708$require$quickSort(this.__generatedMappings, $8E8f3.compareByGeneratedPositionsDeflated);
    $e83d645f81c32708$require$quickSort(this.__originalMappings, $8E8f3.compareByOriginalPositions);
};
$e83d645f81c32708$export$823525094e5b803c = $e83d645f81c32708$var$IndexedSourceMapConsumer;

});
parcelRequire.register("2Poek", function(module, exports) {

$parcel$export(module.exports, "GREATEST_LOWER_BOUND", function () { return $20f323c55065200d$export$4ecd616dce182dff; }, function (v) { return $20f323c55065200d$export$4ecd616dce182dff = v; });
$parcel$export(module.exports, "LEAST_UPPER_BOUND", function () { return $20f323c55065200d$export$b99fbecff261243; }, function (v) { return $20f323c55065200d$export$b99fbecff261243 = v; });
$parcel$export(module.exports, "search", function () { return $20f323c55065200d$export$d76128d007d19019; }, function (v) { return $20f323c55065200d$export$d76128d007d19019 = v; });
/* -*- Mode: js; js-indent-level: 2; -*- */ /*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */ var $20f323c55065200d$export$4ecd616dce182dff;
var $20f323c55065200d$export$b99fbecff261243;
/**
 * This is an implementation of binary search which will always try and return
 * the index of the closest element if there is no exact hit. This is because
 * mappings between original and generated line/col pairs are single points,
 * and there is an implicit region between each of them, so a miss just means
 * that you aren't on the very start of a region.
 *
 * @param aNeedle The element you are looking for.
 * @param aHaystack The array that is being searched.
 * @param aCompare A function which takes the needle and an element in the
 *     array and returns -1, 0, or 1 depending on whether the needle is less
 *     than, equal to, or greater than the element, respectively.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
 */ var $20f323c55065200d$export$d76128d007d19019;
$20f323c55065200d$export$4ecd616dce182dff = 1;
$20f323c55065200d$export$b99fbecff261243 = 2;
/**
 * Recursive implementation of binary search.
 *
 * @param aLow Indices here and lower do not contain the needle.
 * @param aHigh Indices here and higher do not contain the needle.
 * @param aNeedle The element being searched for.
 * @param aHaystack The non-empty array being searched.
 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 */ function $20f323c55065200d$var$recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
    // This function terminates when one of the following is true:
    //
    //   1. We find the exact element we are looking for.
    //
    //   2. We did not find the exact element, but we can return the index of
    //      the next-closest element.
    //
    //   3. We did not find the exact element, and there is no next-closest
    //      element than the one we are searching for, so we return -1.
    var mid = Math.floor((aHigh - aLow) / 2) + aLow;
    var cmp = aCompare(aNeedle, aHaystack[mid], true);
    if (cmp === 0) // Found the element we are looking for.
    return mid;
    else if (cmp > 0) {
        // Our needle is greater than aHaystack[mid].
        if (aHigh - mid > 1) // The element is in the upper half.
        return $20f323c55065200d$var$recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
        // The exact needle element was not found in this haystack. Determine if
        // we are in termination case (3) or (2) and return the appropriate thing.
        if (aBias == $20f323c55065200d$export$b99fbecff261243) return aHigh < aHaystack.length ? aHigh : -1;
        else return mid;
    } else {
        // Our needle is less than aHaystack[mid].
        if (mid - aLow > 1) // The element is in the lower half.
        return $20f323c55065200d$var$recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
        // we are in termination case (3) or (2) and return the appropriate thing.
        if (aBias == $20f323c55065200d$export$b99fbecff261243) return mid;
        else return aLow < 0 ? -1 : aLow;
    }
}
$20f323c55065200d$export$d76128d007d19019 = function search(aNeedle, aHaystack, aCompare, aBias) {
    if (aHaystack.length === 0) return -1;
    var index = $20f323c55065200d$var$recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare, aBias || $20f323c55065200d$export$4ecd616dce182dff);
    if (index < 0) return -1;
    // We have found either the exact element, or the next-closest element than
    // the one we are searching for. However, there may be more than one such
    // element. Make sure we always return the smallest of these.
    while(index - 1 >= 0){
        if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) break;
        --index;
    }
    return index;
};

});

parcelRequire.register("d5U2Q", function(module, exports) {

$parcel$export(module.exports, "quickSort", function () { return $98873751d2b50012$export$866270269b9544a5; }, function (v) { return $98873751d2b50012$export$866270269b9544a5 = v; });
/**
 * Sort the given array in-place with the given comparator function.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 */ var $98873751d2b50012$export$866270269b9544a5;
/* -*- Mode: js; js-indent-level: 2; -*- */ /*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */ // It turns out that some (most?) JavaScript engines don't self-host
// `Array.prototype.sort`. This makes sense because C++ will likely remain
// faster than JS when doing raw CPU-intensive sorting. However, when using a
// custom comparator function, calling back and forth between the VM's C++ and
// JIT'd JS is rather slow *and* loses JIT type information, resulting in
// worse generated code for the comparator function than would be optimal. In
// fact, when sorting with a comparator, these costs outweigh the benefits of
// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
// a ~3500ms mean speed-up in `bench/bench.html`.
/**
 * Swap the elements indexed by `x` and `y` in the array `ary`.
 *
 * @param {Array} ary
 *        The array.
 * @param {Number} x
 *        The index of the first item.
 * @param {Number} y
 *        The index of the second item.
 */ function $98873751d2b50012$var$swap(ary, x, y) {
    var temp = ary[x];
    ary[x] = ary[y];
    ary[y] = temp;
}
/**
 * Returns a random integer within the range `low .. high` inclusive.
 *
 * @param {Number} low
 *        The lower bound on the range.
 * @param {Number} high
 *        The upper bound on the range.
 */ function $98873751d2b50012$var$randomIntInRange(low, high) {
    return Math.round(low + Math.random() * (high - low));
}
/**
 * The Quick Sort algorithm.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 * @param {Number} p
 *        Start index of the array
 * @param {Number} r
 *        End index of the array
 */ function $98873751d2b50012$var$doQuickSort(ary, comparator, p, r) {
    // If our lower bound is less than our upper bound, we (1) partition the
    // array into two pieces and (2) recurse on each half. If it is not, this is
    // the empty array and our base case.
    if (p < r) {
        // (1) Partitioning.
        //
        // The partitioning chooses a pivot between `p` and `r` and moves all
        // elements that are less than or equal to the pivot to the before it, and
        // all the elements that are greater than it after it. The effect is that
        // once partition is done, the pivot is in the exact place it will be when
        // the array is put in sorted order, and it will not need to be moved
        // again. This runs in O(n) time.
        // Always choose a random pivot so that an input array which is reverse
        // sorted does not cause O(n^2) running time.
        var pivotIndex = $98873751d2b50012$var$randomIntInRange(p, r);
        var i = p - 1;
        $98873751d2b50012$var$swap(ary, pivotIndex, r);
        var pivot = ary[r];
        // Immediately after `j` is incremented in this loop, the following hold
        // true:
        //
        //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
        //
        //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
        for(var j = p; j < r; j++)if (comparator(ary[j], pivot) <= 0) {
            i += 1;
            $98873751d2b50012$var$swap(ary, i, j);
        }
        $98873751d2b50012$var$swap(ary, i + 1, j);
        var q = i + 1;
        // (2) Recurse on each half.
        $98873751d2b50012$var$doQuickSort(ary, comparator, p, q - 1);
        $98873751d2b50012$var$doQuickSort(ary, comparator, q + 1, r);
    }
}
$98873751d2b50012$export$866270269b9544a5 = function(ary, comparator) {
    $98873751d2b50012$var$doQuickSort(ary, comparator, 0, ary.length - 1);
};

});


parcelRequire.register("6R14p", function(module, exports) {

$parcel$export(module.exports, "SourceNode", function () { return $4fd885d29a7eb861$export$7e987e8f375d24c2; }, function (v) { return $4fd885d29a7eb861$export$7e987e8f375d24c2 = v; });
var $4fd885d29a7eb861$export$7e987e8f375d24c2;

var $bIdoD = parcelRequire("bIdoD");
var $4fd885d29a7eb861$require$SourceMapGenerator = $bIdoD.SourceMapGenerator;

var $8E8f3 = parcelRequire("8E8f3");
// Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
// operating systems these days (capturing the result).
var $4fd885d29a7eb861$var$REGEX_NEWLINE = /(\r?\n)/;
// Newline character code for charCodeAt() comparisons
var $4fd885d29a7eb861$var$NEWLINE_CODE = 10;
// Private symbol for identifying `SourceNode`s when multiple versions of
// the source-map library are loaded. This MUST NOT CHANGE across
// versions!
var $4fd885d29a7eb861$var$isSourceNode = "$$$isSourceNode$$$";
/**
 * SourceNodes provide a way to abstract over interpolating/concatenating
 * snippets of generated JavaScript source code while maintaining the line and
 * column information associated with the original source code.
 *
 * @param aLine The original line number.
 * @param aColumn The original column number.
 * @param aSource The original source's filename.
 * @param aChunks Optional. An array of strings which are snippets of
 *        generated JS, or other SourceNodes.
 * @param aName The original identifier.
 */ function $4fd885d29a7eb861$var$SourceNode(aLine, aColumn, aSource, aChunks, aName) {
    this.children = [];
    this.sourceContents = {};
    this.line = aLine == null ? null : aLine;
    this.column = aColumn == null ? null : aColumn;
    this.source = aSource == null ? null : aSource;
    this.name = aName == null ? null : aName;
    this[$4fd885d29a7eb861$var$isSourceNode] = true;
    if (aChunks != null) this.add(aChunks);
}
/**
 * Creates a SourceNode from generated code and a SourceMapConsumer.
 *
 * @param aGeneratedCode The generated code
 * @param aSourceMapConsumer The SourceMap for the generated code
 * @param aRelativePath Optional. The path that relative sources in the
 *        SourceMapConsumer should be relative to.
 */ $4fd885d29a7eb861$var$SourceNode.fromStringWithSourceMap = function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
    var addMappingWithCode = function addMappingWithCode(mapping, code) {
        if (mapping === null || mapping.source === undefined) {
            node.add(code);
        } else {
            var source = aRelativePath ? $8E8f3.join(aRelativePath, mapping.source) : mapping.source;
            node.add(new $4fd885d29a7eb861$var$SourceNode(mapping.originalLine, mapping.originalColumn, source, code, mapping.name));
        }
    };
    // The SourceNode we want to fill with the generated code
    // and the SourceMap
    var node = new $4fd885d29a7eb861$var$SourceNode();
    // All even indices of this array are one line of the generated code,
    // while all odd indices are the newlines between two adjacent lines
    // (since `REGEX_NEWLINE` captures its match).
    // Processed fragments are accessed by calling `shiftNextLine`.
    var remainingLines = aGeneratedCode.split($4fd885d29a7eb861$var$REGEX_NEWLINE);
    var remainingLinesIndex = 0;
    var shiftNextLine = function shiftNextLine() {
        var getNextLine = function getNextLine() {
            return remainingLinesIndex < remainingLines.length ? remainingLines[remainingLinesIndex++] : undefined;
        };
        var lineContents = getNextLine();
        // The last line of a file might not have a newline.
        var newLine = getNextLine() || "";
        return lineContents + newLine;
    };
    // We need to remember the position of "remainingLines"
    var lastGeneratedLine = 1, lastGeneratedColumn = 0;
    // The generate SourceNodes we need a code range.
    // To extract it current and last mapping is used.
    // Here we store the last mapping.
    var lastMapping = null;
    aSourceMapConsumer.eachMapping(function(mapping) {
        if (lastMapping !== null) {
            // We add the code from "lastMapping" to "mapping":
            // First check if there is a new line in between.
            if (lastGeneratedLine < mapping.generatedLine) {
                // Associate first line with "lastMapping"
                addMappingWithCode(lastMapping, shiftNextLine());
                lastGeneratedLine++;
                lastGeneratedColumn = 0;
            // The remaining code is added without mapping
            } else {
                // There is no new line in between.
                // Associate the code between "lastGeneratedColumn" and
                // "mapping.generatedColumn" with "lastMapping"
                var nextLine = remainingLines[remainingLinesIndex] || "";
                var code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
                remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn);
                lastGeneratedColumn = mapping.generatedColumn;
                addMappingWithCode(lastMapping, code);
                // No more remaining code, continue
                lastMapping = mapping;
                return;
            }
        }
        // We add the generated code until the first mapping
        // to the SourceNode without any mapping.
        // Each line is added as separate string.
        while(lastGeneratedLine < mapping.generatedLine){
            node.add(shiftNextLine());
            lastGeneratedLine++;
        }
        if (lastGeneratedColumn < mapping.generatedColumn) {
            var nextLine = remainingLines[remainingLinesIndex] || "";
            node.add(nextLine.substr(0, mapping.generatedColumn));
            remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
            lastGeneratedColumn = mapping.generatedColumn;
        }
        lastMapping = mapping;
    }, this);
    // We have processed all mappings.
    if (remainingLinesIndex < remainingLines.length) {
        if (lastMapping) // Associate the remaining code in the current line with "lastMapping"
        addMappingWithCode(lastMapping, shiftNextLine());
        // and add the remaining lines without any mapping
        node.add(remainingLines.splice(remainingLinesIndex).join(""));
    }
    // Copy sourcesContent into SourceNode
    aSourceMapConsumer.sources.forEach(function(sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
            if (aRelativePath != null) sourceFile = $8E8f3.join(aRelativePath, sourceFile);
            node.setSourceContent(sourceFile, content);
        }
    });
    return node;
};
/**
 * Add a chunk of generated JS to this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */ $4fd885d29a7eb861$var$SourceNode.prototype.add = function SourceNode_add(aChunk) {
    if (Array.isArray(aChunk)) aChunk.forEach(function(chunk) {
        this.add(chunk);
    }, this);
    else if (aChunk[$4fd885d29a7eb861$var$isSourceNode] || typeof aChunk === "string") {
        if (aChunk) this.children.push(aChunk);
    } else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
    return this;
};
/**
 * Add a chunk of generated JS to the beginning of this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */ $4fd885d29a7eb861$var$SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
    if (Array.isArray(aChunk)) for(var i = aChunk.length - 1; i >= 0; i--)this.prepend(aChunk[i]);
    else if (aChunk[$4fd885d29a7eb861$var$isSourceNode] || typeof aChunk === "string") this.children.unshift(aChunk);
    else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
    return this;
};
/**
 * Walk over the tree of JS snippets in this node and its children. The
 * walking function is called once for each snippet of JS and is passed that
 * snippet and the its original associated source's line/column location.
 *
 * @param aFn The traversal function.
 */ $4fd885d29a7eb861$var$SourceNode.prototype.walk = function SourceNode_walk(aFn) {
    var chunk;
    for(var i = 0, len = this.children.length; i < len; i++){
        chunk = this.children[i];
        if (chunk[$4fd885d29a7eb861$var$isSourceNode]) chunk.walk(aFn);
        else if (chunk !== "") aFn(chunk, {
            source: this.source,
            line: this.line,
            column: this.column,
            name: this.name
        });
    }
};
/**
 * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
 * each of `this.children`.
 *
 * @param aSep The separator.
 */ $4fd885d29a7eb861$var$SourceNode.prototype.join = function SourceNode_join(aSep) {
    var newChildren;
    var i;
    var len = this.children.length;
    if (len > 0) {
        newChildren = [];
        for(i = 0; i < len - 1; i++){
            newChildren.push(this.children[i]);
            newChildren.push(aSep);
        }
        newChildren.push(this.children[i]);
        this.children = newChildren;
    }
    return this;
};
/**
 * Call String.prototype.replace on the very right-most source snippet. Useful
 * for trimming whitespace from the end of a source node, etc.
 *
 * @param aPattern The pattern to replace.
 * @param aReplacement The thing to replace the pattern with.
 */ $4fd885d29a7eb861$var$SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
    var lastChild = this.children[this.children.length - 1];
    if (lastChild[$4fd885d29a7eb861$var$isSourceNode]) lastChild.replaceRight(aPattern, aReplacement);
    else if (typeof lastChild === "string") this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
    else this.children.push("".replace(aPattern, aReplacement));
    return this;
};
/**
 * Set the source content for a source file. This will be added to the SourceMapGenerator
 * in the sourcesContent field.
 *
 * @param aSourceFile The filename of the source file
 * @param aSourceContent The content of the source file
 */ $4fd885d29a7eb861$var$SourceNode.prototype.setSourceContent = function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
    this.sourceContents[$8E8f3.toSetString(aSourceFile)] = aSourceContent;
};
/**
 * Walk over the tree of SourceNodes. The walking function is called for each
 * source file content and is passed the filename and source content.
 *
 * @param aFn The traversal function.
 */ $4fd885d29a7eb861$var$SourceNode.prototype.walkSourceContents = function SourceNode_walkSourceContents(aFn) {
    for(var i = 0, len = this.children.length; i < len; i++)if (this.children[i][$4fd885d29a7eb861$var$isSourceNode]) this.children[i].walkSourceContents(aFn);
    var sources = Object.keys(this.sourceContents);
    for(var i = 0, len = sources.length; i < len; i++)aFn($8E8f3.fromSetString(sources[i]), this.sourceContents[sources[i]]);
};
/**
 * Return the string representation of this source node. Walks over the tree
 * and concatenates all the various snippets together to one string.
 */ $4fd885d29a7eb861$var$SourceNode.prototype.toString = function SourceNode_toString() {
    var str = "";
    this.walk(function(chunk) {
        str += chunk;
    });
    return str;
};
/**
 * Returns the string representation of this source node along with a source
 * map.
 */ $4fd885d29a7eb861$var$SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
    var generated = {
        code: "",
        line: 1,
        column: 0
    };
    var map = new $4fd885d29a7eb861$require$SourceMapGenerator(aArgs);
    var sourceMappingActive = false;
    var lastOriginalSource = null;
    var lastOriginalLine = null;
    var lastOriginalColumn = null;
    var lastOriginalName = null;
    this.walk(function(chunk, original) {
        generated.code += chunk;
        if (original.source !== null && original.line !== null && original.column !== null) {
            if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) map.addMapping({
                source: original.source,
                original: {
                    line: original.line,
                    column: original.column
                },
                generated: {
                    line: generated.line,
                    column: generated.column
                },
                name: original.name
            });
            lastOriginalSource = original.source;
            lastOriginalLine = original.line;
            lastOriginalColumn = original.column;
            lastOriginalName = original.name;
            sourceMappingActive = true;
        } else if (sourceMappingActive) {
            map.addMapping({
                generated: {
                    line: generated.line,
                    column: generated.column
                }
            });
            lastOriginalSource = null;
            sourceMappingActive = false;
        }
        for(var idx = 0, length = chunk.length; idx < length; idx++)if (chunk.charCodeAt(idx) === $4fd885d29a7eb861$var$NEWLINE_CODE) {
            generated.line++;
            generated.column = 0;
            // Mappings end at eol
            if (idx + 1 === length) {
                lastOriginalSource = null;
                sourceMappingActive = false;
            } else if (sourceMappingActive) map.addMapping({
                source: original.source,
                original: {
                    line: original.line,
                    column: original.column
                },
                generated: {
                    line: generated.line,
                    column: generated.column
                },
                name: original.name
            });
        } else generated.column++;
    });
    this.walkSourceContents(function(sourceFile, sourceContent) {
        map.setSourceContent(sourceFile, sourceContent);
    });
    return {
        code: generated.code,
        map: map
    };
};
$4fd885d29a7eb861$export$7e987e8f375d24c2 = $4fd885d29a7eb861$var$SourceNode;

});


parcelRequire.register("8fzNa", function(module, exports) {
"use strict";

});

function $28fbde635bea944d$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function $28fbde635bea944d$export$2e2bcd8739ae039(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                $28fbde635bea944d$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                $28fbde635bea944d$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}


function $d011ed1ae59d077b$export$2e2bcd8739ae039(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}


function $55a583f5334a6c12$var$setPrototypeOf(o, p) {
    $55a583f5334a6c12$var$setPrototypeOf = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return $55a583f5334a6c12$var$setPrototypeOf(o, p);
}
function $55a583f5334a6c12$export$2e2bcd8739ae039(o, p) {
    return $55a583f5334a6c12$var$setPrototypeOf(o, p);
}


function $5e1436f3cfc25af7$export$2e2bcd8739ae039(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) (0, $55a583f5334a6c12$export$2e2bcd8739ae039)(subClass, superClass);
}


function $145c84195fd23155$export$2e2bcd8739ae039() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}


function $bf992d86b9361765$var$getPrototypeOf(o) {
    $bf992d86b9361765$var$getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return $bf992d86b9361765$var$getPrototypeOf(o);
}
function $bf992d86b9361765$export$2e2bcd8739ae039(o) {
    return $bf992d86b9361765$var$getPrototypeOf(o);
}


function $74313629dd869dbc$export$2e2bcd8739ae039(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}


function $a3e3385b92f0338f$export$2e2bcd8739ae039(obj) {
    "@swc/helpers - typeof";
    return obj && obj.constructor === Symbol ? "symbol" : typeof obj;
}


function $404e7236e98a2c58$export$2e2bcd8739ae039(self, call) {
    if (call && ((0, $a3e3385b92f0338f$export$2e2bcd8739ae039)(call) === "object" || typeof call === "function")) return call;
    return (0, $74313629dd869dbc$export$2e2bcd8739ae039)(self);
}


function $70223088e8354a4f$export$2e2bcd8739ae039(Derived) {
    var hasNativeReflectConstruct = (0, $145c84195fd23155$export$2e2bcd8739ae039)();
    return function _createSuperInternal() {
        var Super = (0, $bf992d86b9361765$export$2e2bcd8739ae039)(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = (0, $bf992d86b9361765$export$2e2bcd8739ae039)(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else result = Super.apply(this, arguments);
        return (0, $404e7236e98a2c58$export$2e2bcd8739ae039)(this, result);
    };
}


var $ac708654e9f9b9e1$exports = {};
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var $ac708654e9f9b9e1$var$runtime = function(exports) {
    "use strict";
    var define = function define(obj, key, value) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
        return obj[key];
    };
    var wrap = function wrap(innerFn, outerFn, self, tryLocsList) {
        // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
        var generator = Object.create(protoGenerator.prototype);
        var context = new Context(tryLocsList || []);
        // The ._invoke method unifies the implementations of the .next,
        // .throw, and .return methods.
        generator._invoke = makeInvokeMethod(innerFn, self, context);
        return generator;
    };
    var tryCatch = // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
        try {
            return {
                type: "normal",
                arg: fn.call(obj, arg)
            };
        } catch (err) {
            return {
                type: "throw",
                arg: err
            };
        }
    };
    var Generator = // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {};
    var GeneratorFunction = function GeneratorFunction() {};
    var GeneratorFunctionPrototype = function GeneratorFunctionPrototype() {};
    var defineIteratorMethods = // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
        [
            "next",
            "throw",
            "return"
        ].forEach(function(method) {
            define(prototype, method, function(arg) {
                return this._invoke(method, arg);
            });
        });
    };
    var AsyncIterator = function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if (record.type === "throw") reject(record.arg);
            else {
                var result = record.arg;
                var value = result.value;
                if (value && typeof value === "object" && hasOwn.call(value, "__await")) return PromiseImpl.resolve(value.__await).then(function(value) {
                    invoke("next", value, resolve, reject);
                }, function(err) {
                    invoke("throw", err, resolve, reject);
                });
                return PromiseImpl.resolve(value).then(function(unwrapped) {
                    // When a yielded Promise is resolved, its final value becomes
                    // the .value of the Promise<{value,done}> result for the
                    // current iteration.
                    result.value = unwrapped;
                    resolve(result);
                }, function(error) {
                    // If a rejected Promise was yielded, throw the rejection back
                    // into the async generator function so it can be handled there.
                    return invoke("throw", error, resolve, reject);
                });
            }
        }
        var previousPromise;
        function enqueue(method, arg) {
            function callInvokeWithMethodAndArg() {
                return new PromiseImpl(function(resolve, reject) {
                    invoke(method, arg, resolve, reject);
                });
            }
            return previousPromise = // If enqueue has been called before, then we want to wait until
            // all previous Promises have been resolved before calling invoke,
            // so that results are always delivered in the correct order. If
            // enqueue has not been called before, then it is important to
            // call invoke immediately, without waiting on a callback to fire,
            // so that the async generator function has the opportunity to do
            // any necessary setup in a predictable way. This predictability
            // is why the Promise constructor synchronously invokes its
            // executor callback, and why async functions synchronously
            // execute code before the first await. Since we implement simple
            // async functions in terms of async generators, it is especially
            // important to get this right, even though it requires care.
            previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
        // Define the unified helper method that is used to implement .next,
        // .throw, and .return (see defineIteratorMethods).
        this._invoke = enqueue;
    };
    var makeInvokeMethod = function makeInvokeMethod(innerFn, self, context) {
        var state = GenStateSuspendedStart;
        return function invoke(method, arg) {
            if (state === GenStateExecuting) throw new Error("Generator is already running");
            if (state === GenStateCompleted) {
                if (method === "throw") throw arg;
                // Be forgiving, per 25.3.3.3.3 of the spec:
                // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
                return doneResult();
            }
            context.method = method;
            context.arg = arg;
            while(true){
                var delegate = context.delegate;
                if (delegate) {
                    var delegateResult = maybeInvokeDelegate(delegate, context);
                    if (delegateResult) {
                        if (delegateResult === ContinueSentinel) continue;
                        return delegateResult;
                    }
                }
                if (context.method === "next") // Setting context._sent for legacy support of Babel's
                // function.sent implementation.
                context.sent = context._sent = context.arg;
                else if (context.method === "throw") {
                    if (state === GenStateSuspendedStart) {
                        state = GenStateCompleted;
                        throw context.arg;
                    }
                    context.dispatchException(context.arg);
                } else if (context.method === "return") context.abrupt("return", context.arg);
                state = GenStateExecuting;
                var record = tryCatch(innerFn, self, context);
                if (record.type === "normal") {
                    // If an exception is thrown from innerFn, we leave state ===
                    // GenStateExecuting and loop back for another invocation.
                    state = context.done ? GenStateCompleted : GenStateSuspendedYield;
                    if (record.arg === ContinueSentinel) continue;
                    return {
                        value: record.arg,
                        done: context.done
                    };
                } else if (record.type === "throw") {
                    state = GenStateCompleted;
                    // Dispatch the exception by looping back around to the
                    // context.dispatchException(context.arg) call above.
                    context.method = "throw";
                    context.arg = record.arg;
                }
            }
        };
    };
    var pushTryEntry = function pushTryEntry(locs) {
        var entry = {
            tryLoc: locs[0]
        };
        if (1 in locs) entry.catchLoc = locs[1];
        if (2 in locs) {
            entry.finallyLoc = locs[2];
            entry.afterLoc = locs[3];
        }
        this.tryEntries.push(entry);
    };
    var resetTryEntry = function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal";
        delete record.arg;
        entry.completion = record;
    };
    var Context = function Context(tryLocsList) {
        // The root entry object (effectively a try statement without a catch
        // or a finally block) gives us a place to store values thrown from
        // locations where there is no enclosing try statement.
        this.tryEntries = [
            {
                tryLoc: "root"
            }
        ];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
    };
    var values = function values(iterable) {
        if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) return iteratorMethod.call(iterable);
            if (typeof iterable.next === "function") return iterable;
            if (!isNaN(iterable.length)) {
                var i = -1, next = function next() {
                    while(++i < iterable.length)if (hasOwn.call(iterable, i)) {
                        next.value = iterable[i];
                        next.done = false;
                        return next;
                    }
                    next.value = undefined;
                    next.done = true;
                    return next;
                };
                return next.next = next;
            }
        }
        // Return an iterator with no values.
        return {
            next: doneResult
        };
    };
    var doneResult = function doneResult() {
        return {
            value: undefined,
            done: true
        };
    };
    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    try {
        // IE 8 has a broken Object.defineProperty that only works on DOM objects.
        define({}, "");
    } catch (err) {
        define = function define(obj, key, value) {
            return obj[key] = value;
        };
    }
    exports.wrap = wrap;
    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};
    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
        return this;
    });
    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    define(Gp, "constructor", GeneratorFunctionPrototype);
    define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction");
    exports.isGeneratorFunction = function(genFun) {
        var ctor = typeof genFun === "function" && genFun.constructor;
        return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };
    exports.mark = function(genFun) {
        if (Object.setPrototypeOf) Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        else {
            genFun.__proto__ = GeneratorFunctionPrototype;
            define(genFun, toStringTagSymbol, "GeneratorFunction");
        }
        genFun.prototype = Object.create(Gp);
        return genFun;
    };
    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function(arg) {
        return {
            __await: arg
        };
    };
    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
    });
    exports.AsyncIterator = AsyncIterator;
    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        if (PromiseImpl === void 0) PromiseImpl = Promise;
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
         : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
        });
    };
    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
        var method = delegate.iterator[context.method];
        if (method === undefined) {
            // A .throw or .return when the delegate iterator has no .throw
            // method always terminates the yield* loop.
            context.delegate = null;
            if (context.method === "throw") {
                // Note: ["return"] must be used for ES3 parsing compatibility.
                if (delegate.iterator["return"]) {
                    // If the delegate iterator has a return method, give it a
                    // chance to clean up.
                    context.method = "return";
                    context.arg = undefined;
                    maybeInvokeDelegate(delegate, context);
                    if (context.method === "throw") // If maybeInvokeDelegate(context) changed context.method from
                    // "return" to "throw", let that override the TypeError below.
                    return ContinueSentinel;
                }
                context.method = "throw";
                context.arg = new TypeError("The iterator does not provide a 'throw' method");
            }
            return ContinueSentinel;
        }
        var record = tryCatch(method, delegate.iterator, context.arg);
        if (record.type === "throw") {
            context.method = "throw";
            context.arg = record.arg;
            context.delegate = null;
            return ContinueSentinel;
        }
        var info = record.arg;
        if (!info) {
            context.method = "throw";
            context.arg = new TypeError("iterator result is not an object");
            context.delegate = null;
            return ContinueSentinel;
        }
        if (info.done) {
            // Assign the result of the finished delegate to the temporary
            // variable specified by delegate.resultName (see delegateYield).
            context[delegate.resultName] = info.value;
            // Resume execution at the desired location (see delegateYield).
            context.next = delegate.nextLoc;
            // If context.method was "throw" but the delegate handled the
            // exception, let the outer generator proceed normally. If
            // context.method was "next", forget context.arg since it has been
            // "consumed" by the delegate iterator. If context.method was
            // "return", allow the original .return call to continue in the
            // outer generator.
            if (context.method !== "return") {
                context.method = "next";
                context.arg = undefined;
            }
        } else // Re-yield the result returned by the delegate method.
        return info;
        // The delegate iterator is finished, so forget it and continue with
        // the outer generator.
        context.delegate = null;
        return ContinueSentinel;
    }
    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator");
    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    define(Gp, iteratorSymbol, function() {
        return this;
    });
    define(Gp, "toString", function() {
        return "[object Generator]";
    });
    exports.keys = function(object) {
        var keys = [];
        for(var key in object)keys.push(key);
        keys.reverse();
        // Rather than returning an object with a next method, we keep
        // things simple and return the next function itself.
        return function next() {
            while(keys.length){
                var key = keys.pop();
                if (key in object) {
                    next.value = key;
                    next.done = false;
                    return next;
                }
            }
            // To avoid creating an additional object, we just hang the .value
            // and .done properties off the next function object itself. This
            // also ensures that the minifier will not anonymize the function.
            next.done = true;
            return next;
        };
    };
    exports.values = values;
    Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
            this.prev = 0;
            this.next = 0;
            // Resetting context._sent for legacy support of Babel's
            // function.sent implementation.
            this.sent = this._sent = undefined;
            this.done = false;
            this.delegate = null;
            this.method = "next";
            this.arg = undefined;
            this.tryEntries.forEach(resetTryEntry);
            if (!skipTempReset) {
                for(var name in this)// Not sure about the optimal order of these conditions:
                if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) this[name] = undefined;
            }
        },
        stop: function stop() {
            this.done = true;
            var rootEntry = this.tryEntries[0];
            var rootRecord = rootEntry.completion;
            if (rootRecord.type === "throw") throw rootRecord.arg;
            return this.rval;
        },
        dispatchException: function dispatchException(exception) {
            var handle = function handle(loc, caught) {
                record.type = "throw";
                record.arg = exception;
                context.next = loc;
                if (caught) {
                    // If the dispatched exception was caught by a catch block,
                    // then let that catch block handle the exception normally.
                    context.method = "next";
                    context.arg = undefined;
                }
                return !!caught;
            };
            if (this.done) throw exception;
            var context = this;
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                var record = entry.completion;
                if (entry.tryLoc === "root") // Exception thrown outside of any try block that could handle
                // it, so set the completion value of the entire function to
                // throw the exception.
                return handle("end");
                if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc");
                    var hasFinally = hasOwn.call(entry, "finallyLoc");
                    if (hasCatch && hasFinally) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, true);
                        else if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else if (hasCatch) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, true);
                    } else if (hasFinally) {
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else throw new Error("try statement without catch or finally");
                }
            }
        },
        abrupt: function abrupt(type, arg) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                    var finallyEntry = entry;
                    break;
                }
            }
            if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) // Ignore the finally entry if control is not jumping to a
            // location outside the try/catch block.
            finallyEntry = null;
            var record = finallyEntry ? finallyEntry.completion : {};
            record.type = type;
            record.arg = arg;
            if (finallyEntry) {
                this.method = "next";
                this.next = finallyEntry.finallyLoc;
                return ContinueSentinel;
            }
            return this.complete(record);
        },
        complete: function complete(record, afterLoc) {
            if (record.type === "throw") throw record.arg;
            if (record.type === "break" || record.type === "continue") this.next = record.arg;
            else if (record.type === "return") {
                this.rval = this.arg = record.arg;
                this.method = "return";
                this.next = "end";
            } else if (record.type === "normal" && afterLoc) this.next = afterLoc;
            return ContinueSentinel;
        },
        finish: function finish(finallyLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) {
                    this.complete(entry.completion, entry.afterLoc);
                    resetTryEntry(entry);
                    return ContinueSentinel;
                }
            }
        },
        "catch": function(tryLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if (record.type === "throw") {
                        var thrown = record.arg;
                        resetTryEntry(entry);
                    }
                    return thrown;
                }
            }
            // The context.catch method must only be called with a location
            // argument that corresponds to a known catch block.
            throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
            this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc
            };
            if (this.method === "next") // Deliberately forget the last sent value so that we don't
            // accidentally pass it on to the delegate.
            this.arg = undefined;
            return ContinueSentinel;
        }
    };
    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;
}($ac708654e9f9b9e1$exports);
try {
    regeneratorRuntime = $ac708654e9f9b9e1$var$runtime;
} catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, in modern engines
    // we can explicitly access globalThis. In older engines we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    if (typeof globalThis === "object") globalThis.regeneratorRuntime = $ac708654e9f9b9e1$var$runtime;
    else Function("r", "regeneratorRuntime = r")($ac708654e9f9b9e1$var$runtime);
}



function $37aec4d01f6984fa$var$_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function $37aec4d01f6984fa$export$2e2bcd8739ae039(Constructor, protoProps, staticProps) {
    if (protoProps) $37aec4d01f6984fa$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $37aec4d01f6984fa$var$_defineProperties(Constructor, staticProps);
    return Constructor;
}




var $6e579df1fe915be1$var$template = '\n{{#each items}}\n<label class="{{classLabel}}" for="{{id}}">{{title}}</label>\n<input class="{{classInput}}" type="{{type}}" name="{{name}}" id="{{id}}"></input>\n{{/each}}\n';
var $6e579df1fe915be1$export$2e2bcd8739ae039 = $6e579df1fe915be1$var$template;




function $f32bfd8434ef5009$export$2e2bcd8739ae039(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}



function $cdc126d7edb6db3b$export$2e2bcd8739ae039(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
        ownKeys.forEach(function(key) {
            (0, $f32bfd8434ef5009$export$2e2bcd8739ae039)(target, key, source[key]);
        });
    }
    return target;
}


function $97b82bb5d9a0e537$var$ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function $97b82bb5d9a0e537$export$2e2bcd8739ae039(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    else $97b82bb5d9a0e537$var$ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
    return target;
}


function $5bc472f2dcf0f77c$export$2e2bcd8739ae039(arr) {
    if (Array.isArray(arr)) return arr;
}


function $e59b4934c399cd12$export$2e2bcd8739ae039(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}


function $ce8b682f621cadb8$export$2e2bcd8739ae039() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}


function $851de69faa6c2fa2$export$2e2bcd8739ae039(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}


function $ce589fc85e36058f$export$2e2bcd8739ae039(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return (0, $851de69faa6c2fa2$export$2e2bcd8739ae039)(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0, $851de69faa6c2fa2$export$2e2bcd8739ae039)(o, minLen);
}


function $e45e0bb52c6ee4f1$export$2e2bcd8739ae039(arr, i) {
    return (0, $5bc472f2dcf0f77c$export$2e2bcd8739ae039)(arr) || (0, $e59b4934c399cd12$export$2e2bcd8739ae039)(arr, i) || (0, $ce589fc85e36058f$export$2e2bcd8739ae039)(arr, i) || (0, $ce8b682f621cadb8$export$2e2bcd8739ae039)();
}


var $e0b8ee1f151445ce$exports = {};
var $b9e82dc90bf8f880$exports = {};
"use strict";
$b9e82dc90bf8f880$exports.__esModule = true;
// istanbul ignore next
function $b9e82dc90bf8f880$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
var $4872d5143bf424b8$exports = {};
"use strict";
$4872d5143bf424b8$exports.__esModule = true;
// istanbul ignore next
function $4872d5143bf424b8$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
// istanbul ignore next
function $4872d5143bf424b8$var$_interopRequireWildcard(obj) {
    if (obj && obj.__esModule) return obj;
    else {
        var newObj = {};
        if (obj != null) {
            for(var key in obj)if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
        newObj["default"] = obj;
        return newObj;
    }
}
var $382041588752eb98$exports = {};

$parcel$export($382041588752eb98$exports, "__esModule", function () { return $382041588752eb98$export$1e511d4a378977f5; }, function (v) { return $382041588752eb98$export$1e511d4a378977f5 = v; });
$parcel$export($382041588752eb98$exports, "HandlebarsEnvironment", function () { return $382041588752eb98$export$5d1b9d3ad24c13f9; }, function (v) { return $382041588752eb98$export$5d1b9d3ad24c13f9 = v; });
$parcel$export($382041588752eb98$exports, "VERSION", function () { return $382041588752eb98$export$a4ad2735b021c132; }, function (v) { return $382041588752eb98$export$a4ad2735b021c132 = v; });
$parcel$export($382041588752eb98$exports, "COMPILER_REVISION", function () { return $382041588752eb98$export$682db5a6f2fa1046; }, function (v) { return $382041588752eb98$export$682db5a6f2fa1046 = v; });
$parcel$export($382041588752eb98$exports, "LAST_COMPATIBLE_COMPILER_REVISION", function () { return $382041588752eb98$export$b416520f9fd5c520; }, function (v) { return $382041588752eb98$export$b416520f9fd5c520 = v; });
$parcel$export($382041588752eb98$exports, "REVISION_CHANGES", function () { return $382041588752eb98$export$534648964353ca81; }, function (v) { return $382041588752eb98$export$534648964353ca81 = v; });
$parcel$export($382041588752eb98$exports, "log", function () { return $382041588752eb98$export$bef1f36f5486a6a3; }, function (v) { return $382041588752eb98$export$bef1f36f5486a6a3 = v; });
$parcel$export($382041588752eb98$exports, "createFrame", function () { return $382041588752eb98$export$52b3fe9f41f5650c; }, function (v) { return $382041588752eb98$export$52b3fe9f41f5650c = v; });
$parcel$export($382041588752eb98$exports, "logger", function () { return $382041588752eb98$export$af88d00dbe7f521; }, function (v) { return $382041588752eb98$export$af88d00dbe7f521 = v; });
var $382041588752eb98$export$1e511d4a378977f5;
var $382041588752eb98$export$5d1b9d3ad24c13f9;
var $382041588752eb98$export$a4ad2735b021c132;
var $382041588752eb98$export$682db5a6f2fa1046;
var $382041588752eb98$export$b416520f9fd5c520;
var $382041588752eb98$export$534648964353ca81;
var $382041588752eb98$export$bef1f36f5486a6a3;
var $382041588752eb98$export$52b3fe9f41f5650c;
var $382041588752eb98$export$af88d00dbe7f521;
"use strict";
$382041588752eb98$export$1e511d4a378977f5 = true;
$382041588752eb98$export$5d1b9d3ad24c13f9 = $382041588752eb98$var$HandlebarsEnvironment;
// istanbul ignore next
function $382041588752eb98$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
var $56c405a178dd13ac$exports = {};

$parcel$export($56c405a178dd13ac$exports, "__esModule", function () { return $56c405a178dd13ac$export$1e511d4a378977f5; }, function (v) { return $56c405a178dd13ac$export$1e511d4a378977f5 = v; });
$parcel$export($56c405a178dd13ac$exports, "extend", function () { return $56c405a178dd13ac$export$8b58be045bf06082; }, function (v) { return $56c405a178dd13ac$export$8b58be045bf06082 = v; });
$parcel$export($56c405a178dd13ac$exports, "indexOf", function () { return $56c405a178dd13ac$export$305f7d4e9d4624f2; }, function (v) { return $56c405a178dd13ac$export$305f7d4e9d4624f2 = v; });
$parcel$export($56c405a178dd13ac$exports, "escapeExpression", function () { return $56c405a178dd13ac$export$e6d4483b22f6b058; }, function (v) { return $56c405a178dd13ac$export$e6d4483b22f6b058 = v; });
$parcel$export($56c405a178dd13ac$exports, "isEmpty", function () { return $56c405a178dd13ac$export$dd1bc94b04021eeb; }, function (v) { return $56c405a178dd13ac$export$dd1bc94b04021eeb = v; });
$parcel$export($56c405a178dd13ac$exports, "createFrame", function () { return $56c405a178dd13ac$export$52b3fe9f41f5650c; }, function (v) { return $56c405a178dd13ac$export$52b3fe9f41f5650c = v; });
$parcel$export($56c405a178dd13ac$exports, "blockParams", function () { return $56c405a178dd13ac$export$b0cad7e592dd4356; }, function (v) { return $56c405a178dd13ac$export$b0cad7e592dd4356 = v; });
$parcel$export($56c405a178dd13ac$exports, "appendContextPath", function () { return $56c405a178dd13ac$export$e0253507f826725a; }, function (v) { return $56c405a178dd13ac$export$e0253507f826725a = v; });
$parcel$export($56c405a178dd13ac$exports, "toString", function () { return $56c405a178dd13ac$export$f84e8e69fd4488a5; }, function (v) { return $56c405a178dd13ac$export$f84e8e69fd4488a5 = v; });
$parcel$export($56c405a178dd13ac$exports, "isFunction", function () { return $56c405a178dd13ac$export$f6e2535fb5126e54; }, function (v) { return $56c405a178dd13ac$export$f6e2535fb5126e54 = v; });
$parcel$export($56c405a178dd13ac$exports, "isArray", function () { return $56c405a178dd13ac$export$43bee75e5e14138e; }, function (v) { return $56c405a178dd13ac$export$43bee75e5e14138e = v; });
var $56c405a178dd13ac$export$1e511d4a378977f5;
var $56c405a178dd13ac$export$8b58be045bf06082;
var $56c405a178dd13ac$export$305f7d4e9d4624f2;
var $56c405a178dd13ac$export$e6d4483b22f6b058;
var $56c405a178dd13ac$export$dd1bc94b04021eeb;
var $56c405a178dd13ac$export$52b3fe9f41f5650c;
var $56c405a178dd13ac$export$b0cad7e592dd4356;
var $56c405a178dd13ac$export$e0253507f826725a;
var $56c405a178dd13ac$export$f84e8e69fd4488a5;
var $56c405a178dd13ac$export$f6e2535fb5126e54;
var $56c405a178dd13ac$export$43bee75e5e14138e;
"use strict";
$56c405a178dd13ac$export$1e511d4a378977f5 = true;
$56c405a178dd13ac$export$8b58be045bf06082 = $56c405a178dd13ac$var$extend;
$56c405a178dd13ac$export$305f7d4e9d4624f2 = $56c405a178dd13ac$var$indexOf;
$56c405a178dd13ac$export$e6d4483b22f6b058 = $56c405a178dd13ac$var$escapeExpression;
$56c405a178dd13ac$export$dd1bc94b04021eeb = $56c405a178dd13ac$var$isEmpty;
$56c405a178dd13ac$export$52b3fe9f41f5650c = $56c405a178dd13ac$var$createFrame;
$56c405a178dd13ac$export$b0cad7e592dd4356 = $56c405a178dd13ac$var$blockParams;
$56c405a178dd13ac$export$e0253507f826725a = $56c405a178dd13ac$var$appendContextPath;
var $56c405a178dd13ac$var$escape = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;",
    "=": "&#x3D;"
};
var $56c405a178dd13ac$var$badChars = /[&<>"'`=]/g, $56c405a178dd13ac$var$possible = /[&<>"'`=]/;
function $56c405a178dd13ac$var$escapeChar(chr) {
    return $56c405a178dd13ac$var$escape[chr];
}
function $56c405a178dd13ac$var$extend(obj /* , ...source */ ) {
    for(var i = 1; i < arguments.length; i++){
        for(var key in arguments[i])if (Object.prototype.hasOwnProperty.call(arguments[i], key)) obj[key] = arguments[i][key];
    }
    return obj;
}
var $56c405a178dd13ac$var$toString = Object.prototype.toString;
$56c405a178dd13ac$export$f84e8e69fd4488a5 = $56c405a178dd13ac$var$toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
/* eslint-disable func-style */ var $56c405a178dd13ac$var$isFunction = function isFunction(value) {
    return typeof value === "function";
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */ if ($56c405a178dd13ac$var$isFunction(/x/)) $56c405a178dd13ac$export$f6e2535fb5126e54 = $56c405a178dd13ac$var$isFunction = function isFunction(value) {
    return typeof value === "function" && $56c405a178dd13ac$var$toString.call(value) === "[object Function]";
};
$56c405a178dd13ac$export$f6e2535fb5126e54 = $56c405a178dd13ac$var$isFunction;
/* eslint-enable func-style */ /* istanbul ignore next */ var $56c405a178dd13ac$var$isArray = Array.isArray || function(value) {
    return value && typeof value === "object" ? $56c405a178dd13ac$var$toString.call(value) === "[object Array]" : false;
};
$56c405a178dd13ac$export$43bee75e5e14138e = $56c405a178dd13ac$var$isArray;
// Older IE versions do not directly support indexOf so we must implement our own, sadly.
function $56c405a178dd13ac$var$indexOf(array, value) {
    for(var i = 0, len = array.length; i < len; i++){
        if (array[i] === value) return i;
    }
    return -1;
}
function $56c405a178dd13ac$var$escapeExpression(string) {
    if (typeof string !== "string") {
        // don't escape SafeStrings, since they're already safe
        if (string && string.toHTML) return string.toHTML();
        else if (string == null) return "";
        else if (!string) return string + "";
        // Force a string conversion as this will be done by the append regardless and
        // the regex test will do this transparently behind the scenes, causing issues if
        // an object's to string has escaped characters in it.
        string = "" + string;
    }
    if (!$56c405a178dd13ac$var$possible.test(string)) return string;
    return string.replace($56c405a178dd13ac$var$badChars, $56c405a178dd13ac$var$escapeChar);
}
function $56c405a178dd13ac$var$isEmpty(value) {
    if (!value && value !== 0) return true;
    else if ($56c405a178dd13ac$var$isArray(value) && value.length === 0) return true;
    else return false;
}
function $56c405a178dd13ac$var$createFrame(object) {
    var frame = $56c405a178dd13ac$var$extend({}, object);
    frame._parent = object;
    return frame;
}
function $56c405a178dd13ac$var$blockParams(params, ids) {
    params.path = ids;
    return params;
}
function $56c405a178dd13ac$var$appendContextPath(contextPath, id) {
    return (contextPath ? contextPath + "." : "") + id;
}


var $95a51684e2818842$exports = {};
"use strict";
$95a51684e2818842$exports.__esModule = true;
var $95a51684e2818842$var$errorProps = [
    "description",
    "fileName",
    "lineNumber",
    "endLineNumber",
    "message",
    "name",
    "number",
    "stack"
];
function $95a51684e2818842$var$Exception(message, node) {
    var loc = node && node.loc, line = undefined, endLineNumber = undefined, column = undefined, endColumn = undefined;
    if (loc) {
        line = loc.start.line;
        endLineNumber = loc.end.line;
        column = loc.start.column;
        endColumn = loc.end.column;
        message += " - " + line + ":" + column;
    }
    var tmp = Error.prototype.constructor.call(this, message);
    // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
    for(var idx = 0; idx < $95a51684e2818842$var$errorProps.length; idx++)this[$95a51684e2818842$var$errorProps[idx]] = tmp[$95a51684e2818842$var$errorProps[idx]];
    /* istanbul ignore else */ if (Error.captureStackTrace) Error.captureStackTrace(this, $95a51684e2818842$var$Exception);
    try {
        if (loc) {
            this.lineNumber = line;
            this.endLineNumber = endLineNumber;
            // Work around issue under safari where we can't directly set the column value
            /* istanbul ignore next */ if (Object.defineProperty) {
                Object.defineProperty(this, "column", {
                    value: column,
                    enumerable: true
                });
                Object.defineProperty(this, "endColumn", {
                    value: endColumn,
                    enumerable: true
                });
            } else {
                this.column = column;
                this.endColumn = endColumn;
            }
        }
    } catch (nop) {
    /* Ignore if the browser is very particular */ }
}
$95a51684e2818842$var$Exception.prototype = new Error();
$95a51684e2818842$exports["default"] = $95a51684e2818842$var$Exception;
$95a51684e2818842$exports = $95a51684e2818842$exports["default"];


var $382041588752eb98$var$_exception2 = $382041588752eb98$var$_interopRequireDefault($95a51684e2818842$exports);
var $44f0f42db692f9c6$export$1e511d4a378977f5;
var $44f0f42db692f9c6$export$bdf7582f74746f6b;
var $44f0f42db692f9c6$export$a8e22c3e8a03ea7e;
"use strict";
$44f0f42db692f9c6$export$1e511d4a378977f5 = true;
$44f0f42db692f9c6$export$bdf7582f74746f6b = $44f0f42db692f9c6$var$registerDefaultHelpers;
$44f0f42db692f9c6$export$a8e22c3e8a03ea7e = $44f0f42db692f9c6$var$moveHelperToHooks;
// istanbul ignore next
function $44f0f42db692f9c6$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
var $8cdaa78a5b87ee6b$exports = {};
"use strict";
$8cdaa78a5b87ee6b$exports.__esModule = true;

$8cdaa78a5b87ee6b$exports["default"] = function(instance) {
    instance.registerHelper("blockHelperMissing", function(context, options) {
        var inverse = options.inverse, fn = options.fn;
        if (context === true) return fn(this);
        else if (context === false || context == null) return inverse(this);
        else if ($56c405a178dd13ac$export$43bee75e5e14138e(context)) {
            if (context.length > 0) {
                if (options.ids) options.ids = [
                    options.name
                ];
                return instance.helpers.each(context, options);
            } else return inverse(this);
        } else {
            if (options.data && options.ids) {
                var data = $56c405a178dd13ac$export$52b3fe9f41f5650c(options.data);
                data.contextPath = $56c405a178dd13ac$export$e0253507f826725a(options.data.contextPath, options.name);
                options = {
                    data: data
                };
            }
            return fn(context, options);
        }
    });
};
$8cdaa78a5b87ee6b$exports = $8cdaa78a5b87ee6b$exports["default"];


var $44f0f42db692f9c6$var$_helpersBlockHelperMissing2 = $44f0f42db692f9c6$var$_interopRequireDefault($8cdaa78a5b87ee6b$exports);
var $ab995f47aa8c4e63$exports = {};
"use strict";
$ab995f47aa8c4e63$exports.__esModule = true;
// istanbul ignore next
function $ab995f47aa8c4e63$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}


var $ab995f47aa8c4e63$var$_exception2 = $ab995f47aa8c4e63$var$_interopRequireDefault($95a51684e2818842$exports);
$ab995f47aa8c4e63$exports["default"] = function(instance) {
    instance.registerHelper("each", function(context, options) {
        var execIteration = function execIteration(field, index, last) {
            if (data) {
                data.key = field;
                data.index = index;
                data.first = index === 0;
                data.last = !!last;
                if (contextPath) data.contextPath = contextPath + field;
            }
            ret = ret + fn(context[field], {
                data: data,
                blockParams: $56c405a178dd13ac$export$b0cad7e592dd4356([
                    context[field],
                    field
                ], [
                    contextPath + field,
                    null
                ])
            });
        };
        if (!options) throw new $ab995f47aa8c4e63$var$_exception2["default"]("Must pass iterator to #each");
        var fn = options.fn, inverse = options.inverse, i = 0, ret = "", data = undefined, contextPath = undefined;
        if (options.data && options.ids) contextPath = $56c405a178dd13ac$export$e0253507f826725a(options.data.contextPath, options.ids[0]) + ".";
        if ($56c405a178dd13ac$export$f6e2535fb5126e54(context)) context = context.call(this);
        if (options.data) data = $56c405a178dd13ac$export$52b3fe9f41f5650c(options.data);
        if (context && typeof context === "object") {
            if ($56c405a178dd13ac$export$43bee75e5e14138e(context)) {
                for(var j = context.length; i < j; i++)if (i in context) execIteration(i, i, i === context.length - 1);
            } else if ($parcel$global.Symbol && context[$parcel$global.Symbol.iterator]) {
                var newContext = [];
                var iterator = context[$parcel$global.Symbol.iterator]();
                for(var it = iterator.next(); !it.done; it = iterator.next())newContext.push(it.value);
                context = newContext;
                for(var j = context.length; i < j; i++)execIteration(i, i, i === context.length - 1);
            } else (function() {
                var priorKey = undefined;
                Object.keys(context).forEach(function(key) {
                    // We're running the iterations one step out of sync so we can detect
                    // the last iteration without have to scan the object twice and create
                    // an itermediate keys array.
                    if (priorKey !== undefined) execIteration(priorKey, i - 1);
                    priorKey = key;
                    i++;
                });
                if (priorKey !== undefined) execIteration(priorKey, i - 1, true);
            })();
        }
        if (i === 0) ret = inverse(this);
        return ret;
    });
};
$ab995f47aa8c4e63$exports = $ab995f47aa8c4e63$exports["default"];


var $44f0f42db692f9c6$var$_helpersEach2 = $44f0f42db692f9c6$var$_interopRequireDefault($ab995f47aa8c4e63$exports);
var $5a6b05ff4630383f$exports = {};
"use strict";
$5a6b05ff4630383f$exports.__esModule = true;
// istanbul ignore next
function $5a6b05ff4630383f$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}

var $5a6b05ff4630383f$var$_exception2 = $5a6b05ff4630383f$var$_interopRequireDefault($95a51684e2818842$exports);
$5a6b05ff4630383f$exports["default"] = function(instance) {
    instance.registerHelper("helperMissing", function() /* [args, ]options */ {
        if (arguments.length === 1) // A missing field in a {{foo}} construct.
        return undefined;
        else // Someone is actually trying to call something, blow up.
        throw new $5a6b05ff4630383f$var$_exception2["default"]('Missing helper: "' + arguments[arguments.length - 1].name + '"');
    });
};
$5a6b05ff4630383f$exports = $5a6b05ff4630383f$exports["default"];


var $44f0f42db692f9c6$var$_helpersHelperMissing2 = $44f0f42db692f9c6$var$_interopRequireDefault($5a6b05ff4630383f$exports);
var $de0bb9d6a3a9688a$exports = {};
"use strict";
$de0bb9d6a3a9688a$exports.__esModule = true;
// istanbul ignore next
function $de0bb9d6a3a9688a$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}


var $de0bb9d6a3a9688a$var$_exception2 = $de0bb9d6a3a9688a$var$_interopRequireDefault($95a51684e2818842$exports);
$de0bb9d6a3a9688a$exports["default"] = function(instance) {
    instance.registerHelper("if", function(conditional, options) {
        if (arguments.length != 2) throw new $de0bb9d6a3a9688a$var$_exception2["default"]("#if requires exactly one argument");
        if ($56c405a178dd13ac$export$f6e2535fb5126e54(conditional)) conditional = conditional.call(this);
        // Default behavior is to render the positive path if the value is truthy and not empty.
        // The `includeZero` option may be set to treat the condtional as purely not empty based on the
        // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
        if (!options.hash.includeZero && !conditional || $56c405a178dd13ac$export$dd1bc94b04021eeb(conditional)) return options.inverse(this);
        else return options.fn(this);
    });
    instance.registerHelper("unless", function(conditional, options) {
        if (arguments.length != 2) throw new $de0bb9d6a3a9688a$var$_exception2["default"]("#unless requires exactly one argument");
        return instance.helpers["if"].call(this, conditional, {
            fn: options.inverse,
            inverse: options.fn,
            hash: options.hash
        });
    });
};
$de0bb9d6a3a9688a$exports = $de0bb9d6a3a9688a$exports["default"];


var $44f0f42db692f9c6$var$_helpersIf2 = $44f0f42db692f9c6$var$_interopRequireDefault($de0bb9d6a3a9688a$exports);
var $5d8ef4ff7fd15c8c$exports = {};
"use strict";
$5d8ef4ff7fd15c8c$exports.__esModule = true;
$5d8ef4ff7fd15c8c$exports["default"] = function(instance) {
    instance.registerHelper("log", function() /* message, options */ {
        var args = [
            undefined
        ], options = arguments[arguments.length - 1];
        for(var i = 0; i < arguments.length - 1; i++)args.push(arguments[i]);
        var level = 1;
        if (options.hash.level != null) level = options.hash.level;
        else if (options.data && options.data.level != null) level = options.data.level;
        args[0] = level;
        instance.log.apply(instance, args);
    });
};
$5d8ef4ff7fd15c8c$exports = $5d8ef4ff7fd15c8c$exports["default"];


var $44f0f42db692f9c6$var$_helpersLog2 = $44f0f42db692f9c6$var$_interopRequireDefault($5d8ef4ff7fd15c8c$exports);
var $560dd8d4022bd7f1$exports = {};
"use strict";
$560dd8d4022bd7f1$exports.__esModule = true;
$560dd8d4022bd7f1$exports["default"] = function(instance) {
    instance.registerHelper("lookup", function(obj, field, options) {
        if (!obj) // Note for 5.0: Change to "obj == null" in 5.0
        return obj;
        return options.lookupProperty(obj, field);
    });
};
$560dd8d4022bd7f1$exports = $560dd8d4022bd7f1$exports["default"];


var $44f0f42db692f9c6$var$_helpersLookup2 = $44f0f42db692f9c6$var$_interopRequireDefault($560dd8d4022bd7f1$exports);
var $030309c939f83547$exports = {};
"use strict";
$030309c939f83547$exports.__esModule = true;
// istanbul ignore next
function $030309c939f83547$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}


var $030309c939f83547$var$_exception2 = $030309c939f83547$var$_interopRequireDefault($95a51684e2818842$exports);
$030309c939f83547$exports["default"] = function(instance) {
    instance.registerHelper("with", function(context, options) {
        if (arguments.length != 2) throw new $030309c939f83547$var$_exception2["default"]("#with requires exactly one argument");
        if ($56c405a178dd13ac$export$f6e2535fb5126e54(context)) context = context.call(this);
        var fn = options.fn;
        if (!$56c405a178dd13ac$export$dd1bc94b04021eeb(context)) {
            var data = options.data;
            if (options.data && options.ids) {
                data = $56c405a178dd13ac$export$52b3fe9f41f5650c(options.data);
                data.contextPath = $56c405a178dd13ac$export$e0253507f826725a(options.data.contextPath, options.ids[0]);
            }
            return fn(context, {
                data: data,
                blockParams: $56c405a178dd13ac$export$b0cad7e592dd4356([
                    context
                ], [
                    data && data.contextPath
                ])
            });
        } else return options.inverse(this);
    });
};
$030309c939f83547$exports = $030309c939f83547$exports["default"];


var $44f0f42db692f9c6$var$_helpersWith2 = $44f0f42db692f9c6$var$_interopRequireDefault($030309c939f83547$exports);
function $44f0f42db692f9c6$var$registerDefaultHelpers(instance) {
    $44f0f42db692f9c6$var$_helpersBlockHelperMissing2["default"](instance);
    $44f0f42db692f9c6$var$_helpersEach2["default"](instance);
    $44f0f42db692f9c6$var$_helpersHelperMissing2["default"](instance);
    $44f0f42db692f9c6$var$_helpersIf2["default"](instance);
    $44f0f42db692f9c6$var$_helpersLog2["default"](instance);
    $44f0f42db692f9c6$var$_helpersLookup2["default"](instance);
    $44f0f42db692f9c6$var$_helpersWith2["default"](instance);
}
function $44f0f42db692f9c6$var$moveHelperToHooks(instance, helperName, keepHelper) {
    if (instance.helpers[helperName]) {
        instance.hooks[helperName] = instance.helpers[helperName];
        if (!keepHelper) delete instance.helpers[helperName];
    }
}


var $fa110f35539d44d3$export$1e511d4a378977f5;
var $fa110f35539d44d3$export$7eaca4a3d56dbe6d;
"use strict";
$fa110f35539d44d3$export$1e511d4a378977f5 = true;
$fa110f35539d44d3$export$7eaca4a3d56dbe6d = $fa110f35539d44d3$var$registerDefaultDecorators;
// istanbul ignore next
function $fa110f35539d44d3$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
var $fead01c99ed76b35$exports = {};
"use strict";
$fead01c99ed76b35$exports.__esModule = true;

$fead01c99ed76b35$exports["default"] = function(instance) {
    instance.registerDecorator("inline", function(fn, props, container, options) {
        var ret = fn;
        if (!props.partials) {
            props.partials = {};
            ret = function ret(context, options) {
                // Create a new partials stack frame prior to exec.
                var original = container.partials;
                container.partials = $56c405a178dd13ac$export$8b58be045bf06082({}, original, props.partials);
                var ret1 = fn(context, options);
                container.partials = original;
                return ret1;
            };
        }
        props.partials[options.args[0]] = options.fn;
        return ret;
    });
};
$fead01c99ed76b35$exports = $fead01c99ed76b35$exports["default"];


var $fa110f35539d44d3$var$_decoratorsInline2 = $fa110f35539d44d3$var$_interopRequireDefault($fead01c99ed76b35$exports);
function $fa110f35539d44d3$var$registerDefaultDecorators(instance) {
    $fa110f35539d44d3$var$_decoratorsInline2["default"](instance);
}


var $48efe621a52d40e4$exports = {};
"use strict";
$48efe621a52d40e4$exports.__esModule = true;

var $48efe621a52d40e4$var$logger = {
    methodMap: [
        "debug",
        "info",
        "warn",
        "error"
    ],
    level: "info",
    // Maps a given level value to the `methodMap` indexes above.
    lookupLevel: function lookupLevel(level) {
        if (typeof level === "string") {
            var levelMap = $56c405a178dd13ac$export$305f7d4e9d4624f2($48efe621a52d40e4$var$logger.methodMap, level.toLowerCase());
            if (levelMap >= 0) level = levelMap;
            else level = parseInt(level, 10);
        }
        return level;
    },
    // Can be overridden in the host environment
    log: function log(level) {
        level = $48efe621a52d40e4$var$logger.lookupLevel(level);
        if (typeof console !== "undefined" && $48efe621a52d40e4$var$logger.lookupLevel($48efe621a52d40e4$var$logger.level) <= level) {
            var method = $48efe621a52d40e4$var$logger.methodMap[level];
            // eslint-disable-next-line no-console
            if (!console[method]) method = "log";
            for(var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)message[_key - 1] = arguments[_key];
            console[method].apply(console, message); // eslint-disable-line no-console
        }
    }
};
$48efe621a52d40e4$exports["default"] = $48efe621a52d40e4$var$logger;
$48efe621a52d40e4$exports = $48efe621a52d40e4$exports["default"];


var $382041588752eb98$var$_logger2 = $382041588752eb98$var$_interopRequireDefault($48efe621a52d40e4$exports);
var $c11f40076624ca93$export$1e511d4a378977f5;
var $c11f40076624ca93$export$9fc505f5102b04a5;
var $c11f40076624ca93$export$8b633651c7cf59b9;
var $c11f40076624ca93$export$419dc2c4b2f2238b;
"use strict";
$c11f40076624ca93$export$1e511d4a378977f5 = true;
$c11f40076624ca93$export$9fc505f5102b04a5 = $c11f40076624ca93$var$createProtoAccessControl;
$c11f40076624ca93$export$8b633651c7cf59b9 = $c11f40076624ca93$var$resultIsAllowed;
$c11f40076624ca93$export$419dc2c4b2f2238b = $c11f40076624ca93$var$resetLoggedProperties;
// istanbul ignore next
function $c11f40076624ca93$var$_interopRequireWildcard(obj) {
    if (obj && obj.__esModule) return obj;
    else {
        var newObj = {};
        if (obj != null) {
            for(var key in obj)if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
        newObj["default"] = obj;
        return newObj;
    }
}
var $39360ee8635b61b2$export$1e511d4a378977f5;
var $39360ee8635b61b2$export$ec2932ee0c0e8dcc;
"use strict";
$39360ee8635b61b2$export$1e511d4a378977f5 = true;
$39360ee8635b61b2$export$ec2932ee0c0e8dcc = $39360ee8635b61b2$var$createNewLookupObject;

/**
 * Create a new object with "null"-prototype to avoid truthy results on prototype properties.
 * The resulting object can be used with "object[property]" to check if a property exists
 * @param {...object} sources a varargs parameter of source objects that will be merged
 * @returns {object}
 */ function $39360ee8635b61b2$var$createNewLookupObject() {
    for(var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++)sources[_key] = arguments[_key];
    return $56c405a178dd13ac$export$8b58be045bf06082.apply(undefined, [
        Object.create(null)
    ].concat(sources));
}



var $c11f40076624ca93$var$logger = $c11f40076624ca93$var$_interopRequireWildcard($48efe621a52d40e4$exports);
var $c11f40076624ca93$var$loggedProperties = Object.create(null);
function $c11f40076624ca93$var$createProtoAccessControl(runtimeOptions) {
    var defaultMethodWhiteList = Object.create(null);
    defaultMethodWhiteList["constructor"] = false;
    defaultMethodWhiteList["__defineGetter__"] = false;
    defaultMethodWhiteList["__defineSetter__"] = false;
    defaultMethodWhiteList["__lookupGetter__"] = false;
    var defaultPropertyWhiteList = Object.create(null);
    // eslint-disable-next-line no-proto
    defaultPropertyWhiteList["__proto__"] = false;
    return {
        properties: {
            whitelist: $39360ee8635b61b2$export$ec2932ee0c0e8dcc(defaultPropertyWhiteList, runtimeOptions.allowedProtoProperties),
            defaultValue: runtimeOptions.allowProtoPropertiesByDefault
        },
        methods: {
            whitelist: $39360ee8635b61b2$export$ec2932ee0c0e8dcc(defaultMethodWhiteList, runtimeOptions.allowedProtoMethods),
            defaultValue: runtimeOptions.allowProtoMethodsByDefault
        }
    };
}
function $c11f40076624ca93$var$resultIsAllowed(result, protoAccessControl, propertyName) {
    if (typeof result === "function") return $c11f40076624ca93$var$checkWhiteList(protoAccessControl.methods, propertyName);
    else return $c11f40076624ca93$var$checkWhiteList(protoAccessControl.properties, propertyName);
}
function $c11f40076624ca93$var$checkWhiteList(protoAccessControlForType, propertyName) {
    if (protoAccessControlForType.whitelist[propertyName] !== undefined) return protoAccessControlForType.whitelist[propertyName] === true;
    if (protoAccessControlForType.defaultValue !== undefined) return protoAccessControlForType.defaultValue;
    $c11f40076624ca93$var$logUnexpecedPropertyAccessOnce(propertyName);
    return false;
}
function $c11f40076624ca93$var$logUnexpecedPropertyAccessOnce(propertyName) {
    if ($c11f40076624ca93$var$loggedProperties[propertyName] !== true) {
        $c11f40076624ca93$var$loggedProperties[propertyName] = true;
        $c11f40076624ca93$var$logger.log("error", 'Handlebars: Access has been denied to resolve the property "' + propertyName + '" because it is not an "own property" of its parent.\n' + "You can add a runtime option to disable the check or this warning:\n" + "See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details");
    }
}
function $c11f40076624ca93$var$resetLoggedProperties() {
    Object.keys($c11f40076624ca93$var$loggedProperties).forEach(function(propertyName) {
        delete $c11f40076624ca93$var$loggedProperties[propertyName];
    });
}


var $382041588752eb98$var$VERSION = "4.7.7";
$382041588752eb98$export$a4ad2735b021c132 = $382041588752eb98$var$VERSION;
var $382041588752eb98$var$COMPILER_REVISION = 8;
$382041588752eb98$export$682db5a6f2fa1046 = $382041588752eb98$var$COMPILER_REVISION;
var $382041588752eb98$var$LAST_COMPATIBLE_COMPILER_REVISION = 7;
$382041588752eb98$export$b416520f9fd5c520 = $382041588752eb98$var$LAST_COMPATIBLE_COMPILER_REVISION;
var $382041588752eb98$var$REVISION_CHANGES = {
    1: "<= 1.0.rc.2",
    2: "== 1.0.0-rc.3",
    3: "== 1.0.0-rc.4",
    4: "== 1.x.x",
    5: "== 2.0.0-alpha.x",
    6: ">= 2.0.0-beta.1",
    7: ">= 4.0.0 <4.3.0",
    8: ">= 4.3.0"
};
$382041588752eb98$export$534648964353ca81 = $382041588752eb98$var$REVISION_CHANGES;
var $382041588752eb98$var$objectType = "[object Object]";
function $382041588752eb98$var$HandlebarsEnvironment(helpers, partials, decorators) {
    this.helpers = helpers || {};
    this.partials = partials || {};
    this.decorators = decorators || {};
    $44f0f42db692f9c6$export$bdf7582f74746f6b(this);
    $fa110f35539d44d3$export$7eaca4a3d56dbe6d(this);
}
$382041588752eb98$var$HandlebarsEnvironment.prototype = {
    constructor: $382041588752eb98$var$HandlebarsEnvironment,
    logger: $382041588752eb98$var$_logger2["default"],
    log: $382041588752eb98$var$_logger2["default"].log,
    registerHelper: function registerHelper(name, fn) {
        if ($56c405a178dd13ac$export$f84e8e69fd4488a5.call(name) === $382041588752eb98$var$objectType) {
            if (fn) throw new $382041588752eb98$var$_exception2["default"]("Arg not supported with multiple helpers");
            $56c405a178dd13ac$export$8b58be045bf06082(this.helpers, name);
        } else this.helpers[name] = fn;
    },
    unregisterHelper: function unregisterHelper(name) {
        delete this.helpers[name];
    },
    registerPartial: function registerPartial(name, partial) {
        if ($56c405a178dd13ac$export$f84e8e69fd4488a5.call(name) === $382041588752eb98$var$objectType) $56c405a178dd13ac$export$8b58be045bf06082(this.partials, name);
        else {
            if (typeof partial === "undefined") throw new $382041588752eb98$var$_exception2["default"]('Attempting to register a partial called "' + name + '" as undefined');
            this.partials[name] = partial;
        }
    },
    unregisterPartial: function unregisterPartial(name) {
        delete this.partials[name];
    },
    registerDecorator: function registerDecorator(name, fn) {
        if ($56c405a178dd13ac$export$f84e8e69fd4488a5.call(name) === $382041588752eb98$var$objectType) {
            if (fn) throw new $382041588752eb98$var$_exception2["default"]("Arg not supported with multiple decorators");
            $56c405a178dd13ac$export$8b58be045bf06082(this.decorators, name);
        } else this.decorators[name] = fn;
    },
    unregisterDecorator: function unregisterDecorator(name) {
        delete this.decorators[name];
    },
    /**
   * Reset the memory of illegal property accesses that have already been logged.
   * @deprecated should only be used in handlebars test-cases
   */ resetLoggedPropertyAccesses: function resetLoggedPropertyAccesses() {
        $c11f40076624ca93$export$419dc2c4b2f2238b();
    }
};
var $382041588752eb98$var$log = $382041588752eb98$var$_logger2["default"].log;
$382041588752eb98$export$bef1f36f5486a6a3 = $382041588752eb98$var$log;
$382041588752eb98$export$52b3fe9f41f5650c = $56c405a178dd13ac$export$52b3fe9f41f5650c;
$382041588752eb98$export$af88d00dbe7f521 = $382041588752eb98$var$_logger2["default"];


var $4872d5143bf424b8$var$base = $4872d5143bf424b8$var$_interopRequireWildcard($382041588752eb98$exports);
var $4353d95c3b9cb6e8$exports = {};
// Build out our basic SafeString type
"use strict";
$4353d95c3b9cb6e8$exports.__esModule = true;
function $4353d95c3b9cb6e8$var$SafeString(string) {
    this.string = string;
}
$4353d95c3b9cb6e8$var$SafeString.prototype.toString = $4353d95c3b9cb6e8$var$SafeString.prototype.toHTML = function() {
    return "" + this.string;
};
$4353d95c3b9cb6e8$exports["default"] = $4353d95c3b9cb6e8$var$SafeString;
$4353d95c3b9cb6e8$exports = $4353d95c3b9cb6e8$exports["default"];


var $4872d5143bf424b8$var$_handlebarsSafeString2 = $4872d5143bf424b8$var$_interopRequireDefault($4353d95c3b9cb6e8$exports);

var $4872d5143bf424b8$var$_handlebarsException2 = $4872d5143bf424b8$var$_interopRequireDefault($95a51684e2818842$exports);

var $4872d5143bf424b8$var$Utils = $4872d5143bf424b8$var$_interopRequireWildcard($56c405a178dd13ac$exports);
var $cc8c4a4d61374d17$exports = {};

$parcel$export($cc8c4a4d61374d17$exports, "__esModule", function () { return $cc8c4a4d61374d17$export$1e511d4a378977f5; }, function (v) { return $cc8c4a4d61374d17$export$1e511d4a378977f5 = v; });
$parcel$export($cc8c4a4d61374d17$exports, "checkRevision", function () { return $cc8c4a4d61374d17$export$1a97de37fc44aecb; }, function (v) { return $cc8c4a4d61374d17$export$1a97de37fc44aecb = v; });
$parcel$export($cc8c4a4d61374d17$exports, "template", function () { return $cc8c4a4d61374d17$export$ce69bd05624d0c48; }, function (v) { return $cc8c4a4d61374d17$export$ce69bd05624d0c48 = v; });
$parcel$export($cc8c4a4d61374d17$exports, "wrapProgram", function () { return $cc8c4a4d61374d17$export$3976c39aa34be3b; }, function (v) { return $cc8c4a4d61374d17$export$3976c39aa34be3b = v; });
$parcel$export($cc8c4a4d61374d17$exports, "resolvePartial", function () { return $cc8c4a4d61374d17$export$ee54384c867bf98e; }, function (v) { return $cc8c4a4d61374d17$export$ee54384c867bf98e = v; });
$parcel$export($cc8c4a4d61374d17$exports, "invokePartial", function () { return $cc8c4a4d61374d17$export$6c4303200e44071a; }, function (v) { return $cc8c4a4d61374d17$export$6c4303200e44071a = v; });
$parcel$export($cc8c4a4d61374d17$exports, "noop", function () { return $cc8c4a4d61374d17$export$8793edee2d425525; }, function (v) { return $cc8c4a4d61374d17$export$8793edee2d425525 = v; });

var $cc8c4a4d61374d17$export$1e511d4a378977f5;
var $cc8c4a4d61374d17$export$1a97de37fc44aecb;
var $cc8c4a4d61374d17$export$ce69bd05624d0c48;
var $cc8c4a4d61374d17$export$3976c39aa34be3b;
var $cc8c4a4d61374d17$export$ee54384c867bf98e;
var $cc8c4a4d61374d17$export$6c4303200e44071a;
var $cc8c4a4d61374d17$export$8793edee2d425525;
"use strict";
$cc8c4a4d61374d17$export$1e511d4a378977f5 = true;
$cc8c4a4d61374d17$export$1a97de37fc44aecb = $cc8c4a4d61374d17$var$checkRevision;
$cc8c4a4d61374d17$export$ce69bd05624d0c48 = $cc8c4a4d61374d17$var$template;
$cc8c4a4d61374d17$export$3976c39aa34be3b = $cc8c4a4d61374d17$var$wrapProgram;
$cc8c4a4d61374d17$export$ee54384c867bf98e = $cc8c4a4d61374d17$var$resolvePartial;
$cc8c4a4d61374d17$export$6c4303200e44071a = $cc8c4a4d61374d17$var$invokePartial;
$cc8c4a4d61374d17$export$8793edee2d425525 = $cc8c4a4d61374d17$var$noop;
// istanbul ignore next
function $cc8c4a4d61374d17$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
// istanbul ignore next
function $cc8c4a4d61374d17$var$_interopRequireWildcard(obj) {
    if (obj && obj.__esModule) return obj;
    else {
        var newObj = {};
        if (obj != null) {
            for(var key in obj)if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
        newObj["default"] = obj;
        return newObj;
    }
}

var $cc8c4a4d61374d17$var$Utils = $cc8c4a4d61374d17$var$_interopRequireWildcard($56c405a178dd13ac$exports);

var $cc8c4a4d61374d17$var$_exception2 = $cc8c4a4d61374d17$var$_interopRequireDefault($95a51684e2818842$exports);


var $e0091db74108750c$export$1e511d4a378977f5;
var $e0091db74108750c$export$34b84bc8884ca465;
"use strict";
$e0091db74108750c$export$1e511d4a378977f5 = true;
$e0091db74108750c$export$34b84bc8884ca465 = $e0091db74108750c$var$wrapHelper;
function $e0091db74108750c$var$wrapHelper(helper, transformOptionsFn) {
    if (typeof helper !== "function") // This should not happen, but apparently it does in https://github.com/wycats/handlebars.js/issues/1639
    // We try to make the wrapper least-invasive by not wrapping it, if the helper is not a function.
    return helper;
    var wrapper = function wrapper() /* dynamic arguments */ {
        var options = arguments[arguments.length - 1];
        arguments[arguments.length - 1] = transformOptionsFn(options);
        return helper.apply(this, arguments);
    };
    return wrapper;
}



function $cc8c4a4d61374d17$var$checkRevision(compilerInfo) {
    var compilerRevision = compilerInfo && compilerInfo[0] || 1, currentRevision = $382041588752eb98$export$682db5a6f2fa1046;
    if (compilerRevision >= $382041588752eb98$export$b416520f9fd5c520 && compilerRevision <= $382041588752eb98$export$682db5a6f2fa1046) return;
    if (compilerRevision < $382041588752eb98$export$b416520f9fd5c520) {
        var runtimeVersions = $382041588752eb98$export$534648964353ca81[currentRevision], compilerVersions = $382041588752eb98$export$534648964353ca81[compilerRevision];
        throw new $cc8c4a4d61374d17$var$_exception2["default"]("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + runtimeVersions + ") or downgrade your runtime to an older version (" + compilerVersions + ").");
    } else // Use the embedded version info since the runtime doesn't know about this revision yet
    throw new $cc8c4a4d61374d17$var$_exception2["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + compilerInfo[1] + ").");
}
function $cc8c4a4d61374d17$var$template(templateSpec, env) {
    var invokePartialWrapper = function invokePartialWrapper(partial, context, options) {
        if (options.hash) {
            context = $cc8c4a4d61374d17$var$Utils.extend({}, context, options.hash);
            if (options.ids) options.ids[0] = true;
        }
        partial = env.VM.resolvePartial.call(this, partial, context, options);
        var extendedOptions = $cc8c4a4d61374d17$var$Utils.extend({}, options, {
            hooks: this.hooks,
            protoAccessControl: this.protoAccessControl
        });
        var result = env.VM.invokePartial.call(this, partial, context, extendedOptions);
        if (result == null && env.compile) {
            options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
            result = options.partials[options.name](context, extendedOptions);
        }
        if (result != null) {
            if (options.indent) {
                var lines = result.split("\n");
                for(var i = 0, l = lines.length; i < l; i++){
                    if (!lines[i] && i + 1 === l) break;
                    lines[i] = options.indent + lines[i];
                }
                result = lines.join("\n");
            }
            return result;
        } else throw new $cc8c4a4d61374d17$var$_exception2["default"]("The partial " + options.name + " could not be compiled when running in runtime-only mode");
    };
    /* istanbul ignore next */ if (!env) throw new $cc8c4a4d61374d17$var$_exception2["default"]("No environment passed to template");
    if (!templateSpec || !templateSpec.main) throw new $cc8c4a4d61374d17$var$_exception2["default"]("Unknown template object: " + (typeof templateSpec === "undefined" ? "undefined" : (0, $a3e3385b92f0338f$export$2e2bcd8739ae039)(templateSpec)));
    templateSpec.main.decorator = templateSpec.main_d;
    // Note: Using env.VM references rather than local var references throughout this section to allow
    // for external users to override these as pseudo-supported APIs.
    env.VM.checkRevision(templateSpec.compiler);
    // backwards compatibility for precompiled templates with compiler-version 7 (<4.3.0)
    var templateWasPrecompiledWithCompilerV7 = templateSpec.compiler && templateSpec.compiler[0] === 7;
    // Just add water
    var container = {
        strict: function strict(obj, name, loc) {
            if (!obj || !(name in obj)) throw new $cc8c4a4d61374d17$var$_exception2["default"]('"' + name + '" not defined in ' + obj, {
                loc: loc
            });
            return container.lookupProperty(obj, name);
        },
        lookupProperty: function lookupProperty(parent, propertyName) {
            var result = parent[propertyName];
            if (result == null) return result;
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) return result;
            if ($c11f40076624ca93$export$8b633651c7cf59b9(result, container.protoAccessControl, propertyName)) return result;
            return undefined;
        },
        lookup: function lookup(depths, name) {
            var len = depths.length;
            for(var i = 0; i < len; i++){
                var result = depths[i] && container.lookupProperty(depths[i], name);
                if (result != null) return depths[i][name];
            }
        },
        lambda: function lambda(current, context) {
            return typeof current === "function" ? current.call(context) : current;
        },
        escapeExpression: $cc8c4a4d61374d17$var$Utils.escapeExpression,
        invokePartial: invokePartialWrapper,
        fn: function fn(i) {
            var _$ret = templateSpec[i];
            _$ret.decorator = templateSpec[i + "_d"];
            return _$ret;
        },
        programs: [],
        program: function program(i, data, declaredBlockParams, blockParams, depths) {
            var programWrapper = this.programs[i], fn = this.fn(i);
            if (data || depths || blockParams || declaredBlockParams) programWrapper = $cc8c4a4d61374d17$var$wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
            else if (!programWrapper) programWrapper = this.programs[i] = $cc8c4a4d61374d17$var$wrapProgram(this, i, fn);
            return programWrapper;
        },
        data: function data(value, depth) {
            while(value && depth--)value = value._parent;
            return value;
        },
        mergeIfNeeded: function mergeIfNeeded(param, common) {
            var obj = param || common;
            if (param && common && param !== common) obj = $cc8c4a4d61374d17$var$Utils.extend({}, common, param);
            return obj;
        },
        // An empty object to use as replacement for null-contexts
        nullContext: Object.seal({}),
        noop: env.VM.noop,
        compilerInfo: templateSpec.compiler
    };
    function ret(context) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var data = options.data;
        ret._setup(options);
        if (!options.partial && templateSpec.useData) data = $cc8c4a4d61374d17$var$initData(context, data);
        var depths = undefined, blockParams = templateSpec.useBlockParams ? [] : undefined;
        if (templateSpec.useDepths) {
            if (options.depths) depths = context != options.depths[0] ? [
                context
            ].concat(options.depths) : options.depths;
            else depths = [
                context
            ];
        }
        function main(context /*, options*/ ) {
            return "" + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
        }
        main = $cc8c4a4d61374d17$var$executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
        return main(context, options);
    }
    ret.isTop = true;
    ret._setup = function(options) {
        if (!options.partial) {
            var mergedHelpers = $cc8c4a4d61374d17$var$Utils.extend({}, env.helpers, options.helpers);
            $cc8c4a4d61374d17$var$wrapHelpersToPassLookupProperty(mergedHelpers, container);
            container.helpers = mergedHelpers;
            if (templateSpec.usePartial) // Use mergeIfNeeded here to prevent compiling global partials multiple times
            container.partials = container.mergeIfNeeded(options.partials, env.partials);
            if (templateSpec.usePartial || templateSpec.useDecorators) container.decorators = $cc8c4a4d61374d17$var$Utils.extend({}, env.decorators, options.decorators);
            container.hooks = {};
            container.protoAccessControl = $c11f40076624ca93$export$9fc505f5102b04a5(options);
            var keepHelperInHelpers = options.allowCallsToHelperMissing || templateWasPrecompiledWithCompilerV7;
            $44f0f42db692f9c6$export$a8e22c3e8a03ea7e(container, "helperMissing", keepHelperInHelpers);
            $44f0f42db692f9c6$export$a8e22c3e8a03ea7e(container, "blockHelperMissing", keepHelperInHelpers);
        } else {
            container.protoAccessControl = options.protoAccessControl; // internal option
            container.helpers = options.helpers;
            container.partials = options.partials;
            container.decorators = options.decorators;
            container.hooks = options.hooks;
        }
    };
    ret._child = function(i, data, blockParams, depths) {
        if (templateSpec.useBlockParams && !blockParams) throw new $cc8c4a4d61374d17$var$_exception2["default"]("must pass block params");
        if (templateSpec.useDepths && !depths) throw new $cc8c4a4d61374d17$var$_exception2["default"]("must pass parent depths");
        return $cc8c4a4d61374d17$var$wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
    };
    return ret;
}
function $cc8c4a4d61374d17$var$wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
    var prog = function prog(context) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var currentDepths = depths;
        if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) currentDepths = [
            context
        ].concat(depths);
        return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [
            options.blockParams
        ].concat(blockParams), currentDepths);
    };
    prog = $cc8c4a4d61374d17$var$executeDecorators(fn, prog, container, depths, data, blockParams);
    prog.program = i;
    prog.depth = depths ? depths.length : 0;
    prog.blockParams = declaredBlockParams || 0;
    return prog;
}
/**
 * This is currently part of the official API, therefore implementation details should not be changed.
 */ function $cc8c4a4d61374d17$var$resolvePartial(partial, context, options) {
    if (!partial) {
        if (options.name === "@partial-block") partial = options.data["partial-block"];
        else partial = options.partials[options.name];
    } else if (!partial.call && !options.name) {
        // This is a dynamic partial that returned a string
        options.name = partial;
        partial = options.partials[partial];
    }
    return partial;
}
function $cc8c4a4d61374d17$var$invokePartial(partial, context, options) {
    // Use the current closure context to save the partial-block if this partial
    var currentPartialBlock = options.data && options.data["partial-block"];
    options.partial = true;
    if (options.ids) options.data.contextPath = options.ids[0] || options.data.contextPath;
    var partialBlock = undefined;
    if (options.fn && options.fn !== $cc8c4a4d61374d17$var$noop) (function() {
        options.data = $382041588752eb98$export$52b3fe9f41f5650c(options.data);
        // Wrapper function to get access to currentPartialBlock from the closure
        var fn = options.fn;
        partialBlock = options.data["partial-block"] = function partialBlockWrapper(context) {
            var _$options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
            // Restore the partial-block from the closure for the execution of the block
            // i.e. the part inside the block of the partial call.
            _$options.data = $382041588752eb98$export$52b3fe9f41f5650c(_$options.data);
            _$options.data["partial-block"] = currentPartialBlock;
            return fn(context, _$options);
        };
        if (fn.partials) options.partials = $cc8c4a4d61374d17$var$Utils.extend({}, options.partials, fn.partials);
    })();
    if (partial === undefined && partialBlock) partial = partialBlock;
    if (partial === undefined) throw new $cc8c4a4d61374d17$var$_exception2["default"]("The partial " + options.name + " could not be found");
    else if (partial instanceof Function) return partial(context, options);
}
function $cc8c4a4d61374d17$var$noop() {
    return "";
}
function $cc8c4a4d61374d17$var$initData(context, data) {
    if (!data || !("root" in data)) {
        data = data ? $382041588752eb98$export$52b3fe9f41f5650c(data) : {};
        data.root = context;
    }
    return data;
}
function $cc8c4a4d61374d17$var$executeDecorators(fn, prog, container, depths, data, blockParams) {
    if (fn.decorator) {
        var props = {};
        prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
        $cc8c4a4d61374d17$var$Utils.extend(prog, props);
    }
    return prog;
}
function $cc8c4a4d61374d17$var$wrapHelpersToPassLookupProperty(mergedHelpers, container) {
    Object.keys(mergedHelpers).forEach(function(helperName) {
        var helper = mergedHelpers[helperName];
        mergedHelpers[helperName] = $cc8c4a4d61374d17$var$passLookupPropertyOption(helper, container);
    });
}
function $cc8c4a4d61374d17$var$passLookupPropertyOption(helper, container) {
    var lookupProperty = container.lookupProperty;
    return $e0091db74108750c$export$34b84bc8884ca465(helper, function(options) {
        return $cc8c4a4d61374d17$var$Utils.extend({
            lookupProperty: lookupProperty
        }, options);
    });
}


var $4872d5143bf424b8$var$runtime = $4872d5143bf424b8$var$_interopRequireWildcard($cc8c4a4d61374d17$exports);
var $67e016f14749198d$exports = {};
"use strict";
$67e016f14749198d$exports.__esModule = true;
$67e016f14749198d$exports["default"] = function(Handlebars) {
    /* istanbul ignore next */ var root = typeof $parcel$global !== "undefined" ? $parcel$global : window, $Handlebars = root.Handlebars;
    /* istanbul ignore next */ Handlebars.noConflict = function() {
        if (root.Handlebars === Handlebars) root.Handlebars = $Handlebars;
        return Handlebars;
    };
};
$67e016f14749198d$exports = $67e016f14749198d$exports["default"];


var $4872d5143bf424b8$var$_handlebarsNoConflict2 = $4872d5143bf424b8$var$_interopRequireDefault($67e016f14749198d$exports);
// For compatibility and usage outside of module systems, make the Handlebars object a namespace
function $4872d5143bf424b8$var$create() {
    var hb = new $4872d5143bf424b8$var$base.HandlebarsEnvironment();
    $4872d5143bf424b8$var$Utils.extend(hb, $4872d5143bf424b8$var$base);
    hb.SafeString = $4872d5143bf424b8$var$_handlebarsSafeString2["default"];
    hb.Exception = $4872d5143bf424b8$var$_handlebarsException2["default"];
    hb.Utils = $4872d5143bf424b8$var$Utils;
    hb.escapeExpression = $4872d5143bf424b8$var$Utils.escapeExpression;
    hb.VM = $4872d5143bf424b8$var$runtime;
    hb.template = function(spec) {
        return $4872d5143bf424b8$var$runtime.template(spec, hb);
    };
    return hb;
}
var $4872d5143bf424b8$var$inst = $4872d5143bf424b8$var$create();
$4872d5143bf424b8$var$inst.create = $4872d5143bf424b8$var$create;
$4872d5143bf424b8$var$_handlebarsNoConflict2["default"]($4872d5143bf424b8$var$inst);
$4872d5143bf424b8$var$inst["default"] = $4872d5143bf424b8$var$inst;
$4872d5143bf424b8$exports["default"] = $4872d5143bf424b8$var$inst;
$4872d5143bf424b8$exports = $4872d5143bf424b8$exports["default"];


var $b9e82dc90bf8f880$var$_handlebarsRuntime2 = $b9e82dc90bf8f880$var$_interopRequireDefault($4872d5143bf424b8$exports);
var $8a06cdb0c3679840$exports = {};
"use strict";
$8a06cdb0c3679840$exports.__esModule = true;
var $8a06cdb0c3679840$var$AST = {
    // Public API used to evaluate derived attributes regarding AST nodes
    helpers: {
        // a mustache is definitely a helper if:
        // * it is an eligible helper, and
        // * it has at least one parameter or hash segment
        helperExpression: function helperExpression(node) {
            return node.type === "SubExpression" || (node.type === "MustacheStatement" || node.type === "BlockStatement") && !!(node.params && node.params.length || node.hash);
        },
        scopedId: function scopedId(path) {
            return /^\.|this\b/.test(path.original);
        },
        // an ID is simple if it only has one part, and that part is not
        // `..` or `this`.
        simpleId: function simpleId(path) {
            return path.parts.length === 1 && !$8a06cdb0c3679840$var$AST.helpers.scopedId(path) && !path.depth;
        }
    }
};
// Must be exported as an object rather than the root of the module as the jison lexer
// must modify the object to operate properly.
$8a06cdb0c3679840$exports["default"] = $8a06cdb0c3679840$var$AST;
$8a06cdb0c3679840$exports = $8a06cdb0c3679840$exports["default"];


var $b9e82dc90bf8f880$var$_handlebarsCompilerAst2 = $b9e82dc90bf8f880$var$_interopRequireDefault($8a06cdb0c3679840$exports);
var $9eaa0297a6df13c2$export$1e511d4a378977f5;
var $9eaa0297a6df13c2$export$fc85b2c4462e0bc6;
var $9eaa0297a6df13c2$export$98e6a39c04603d36;
var $9eaa0297a6df13c2$export$8f49e4af10703ce3;
"use strict";
$9eaa0297a6df13c2$export$1e511d4a378977f5 = true;
$9eaa0297a6df13c2$export$fc85b2c4462e0bc6 = $9eaa0297a6df13c2$var$parseWithoutProcessing;
$9eaa0297a6df13c2$export$98e6a39c04603d36 = $9eaa0297a6df13c2$var$parse;
// istanbul ignore next
function $9eaa0297a6df13c2$var$_interopRequireWildcard(obj) {
    if (obj && obj.__esModule) return obj;
    else {
        var newObj = {};
        if (obj != null) {
            for(var key in obj)if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
        newObj["default"] = obj;
        return newObj;
    }
}
// istanbul ignore next
function $9eaa0297a6df13c2$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
var $b26687f1a7a330ce$exports = {};
// File ignored in coverage tests via setting in .istanbul.yml
/* Jison generated parser */ "use strict";
$b26687f1a7a330ce$exports.__esModule = true;
var $b26687f1a7a330ce$var$handlebars = function() {
    var Parser = function Parser() {
        this.yy = {};
    };
    var parser = {
        trace: function trace() {},
        yy: {},
        symbols_: {
            error: 2,
            root: 3,
            program: 4,
            EOF: 5,
            program_repetition0: 6,
            statement: 7,
            mustache: 8,
            block: 9,
            rawBlock: 10,
            partial: 11,
            partialBlock: 12,
            content: 13,
            COMMENT: 14,
            CONTENT: 15,
            openRawBlock: 16,
            rawBlock_repetition0: 17,
            END_RAW_BLOCK: 18,
            OPEN_RAW_BLOCK: 19,
            helperName: 20,
            openRawBlock_repetition0: 21,
            openRawBlock_option0: 22,
            CLOSE_RAW_BLOCK: 23,
            openBlock: 24,
            block_option0: 25,
            closeBlock: 26,
            openInverse: 27,
            block_option1: 28,
            OPEN_BLOCK: 29,
            openBlock_repetition0: 30,
            openBlock_option0: 31,
            openBlock_option1: 32,
            CLOSE: 33,
            OPEN_INVERSE: 34,
            openInverse_repetition0: 35,
            openInverse_option0: 36,
            openInverse_option1: 37,
            openInverseChain: 38,
            OPEN_INVERSE_CHAIN: 39,
            openInverseChain_repetition0: 40,
            openInverseChain_option0: 41,
            openInverseChain_option1: 42,
            inverseAndProgram: 43,
            INVERSE: 44,
            inverseChain: 45,
            inverseChain_option0: 46,
            OPEN_ENDBLOCK: 47,
            OPEN: 48,
            mustache_repetition0: 49,
            mustache_option0: 50,
            OPEN_UNESCAPED: 51,
            mustache_repetition1: 52,
            mustache_option1: 53,
            CLOSE_UNESCAPED: 54,
            OPEN_PARTIAL: 55,
            partialName: 56,
            partial_repetition0: 57,
            partial_option0: 58,
            openPartialBlock: 59,
            OPEN_PARTIAL_BLOCK: 60,
            openPartialBlock_repetition0: 61,
            openPartialBlock_option0: 62,
            param: 63,
            sexpr: 64,
            OPEN_SEXPR: 65,
            sexpr_repetition0: 66,
            sexpr_option0: 67,
            CLOSE_SEXPR: 68,
            hash: 69,
            hash_repetition_plus0: 70,
            hashSegment: 71,
            ID: 72,
            EQUALS: 73,
            blockParams: 74,
            OPEN_BLOCK_PARAMS: 75,
            blockParams_repetition_plus0: 76,
            CLOSE_BLOCK_PARAMS: 77,
            path: 78,
            dataName: 79,
            STRING: 80,
            NUMBER: 81,
            BOOLEAN: 82,
            UNDEFINED: 83,
            NULL: 84,
            DATA: 85,
            pathSegments: 86,
            SEP: 87,
            $accept: 0,
            $end: 1
        },
        terminals_: {
            2: "error",
            5: "EOF",
            14: "COMMENT",
            15: "CONTENT",
            18: "END_RAW_BLOCK",
            19: "OPEN_RAW_BLOCK",
            23: "CLOSE_RAW_BLOCK",
            29: "OPEN_BLOCK",
            33: "CLOSE",
            34: "OPEN_INVERSE",
            39: "OPEN_INVERSE_CHAIN",
            44: "INVERSE",
            47: "OPEN_ENDBLOCK",
            48: "OPEN",
            51: "OPEN_UNESCAPED",
            54: "CLOSE_UNESCAPED",
            55: "OPEN_PARTIAL",
            60: "OPEN_PARTIAL_BLOCK",
            65: "OPEN_SEXPR",
            68: "CLOSE_SEXPR",
            72: "ID",
            73: "EQUALS",
            75: "OPEN_BLOCK_PARAMS",
            77: "CLOSE_BLOCK_PARAMS",
            80: "STRING",
            81: "NUMBER",
            82: "BOOLEAN",
            83: "UNDEFINED",
            84: "NULL",
            85: "DATA",
            87: "SEP"
        },
        productions_: [
            0,
            [
                3,
                2
            ],
            [
                4,
                1
            ],
            [
                7,
                1
            ],
            [
                7,
                1
            ],
            [
                7,
                1
            ],
            [
                7,
                1
            ],
            [
                7,
                1
            ],
            [
                7,
                1
            ],
            [
                7,
                1
            ],
            [
                13,
                1
            ],
            [
                10,
                3
            ],
            [
                16,
                5
            ],
            [
                9,
                4
            ],
            [
                9,
                4
            ],
            [
                24,
                6
            ],
            [
                27,
                6
            ],
            [
                38,
                6
            ],
            [
                43,
                2
            ],
            [
                45,
                3
            ],
            [
                45,
                1
            ],
            [
                26,
                3
            ],
            [
                8,
                5
            ],
            [
                8,
                5
            ],
            [
                11,
                5
            ],
            [
                12,
                3
            ],
            [
                59,
                5
            ],
            [
                63,
                1
            ],
            [
                63,
                1
            ],
            [
                64,
                5
            ],
            [
                69,
                1
            ],
            [
                71,
                3
            ],
            [
                74,
                3
            ],
            [
                20,
                1
            ],
            [
                20,
                1
            ],
            [
                20,
                1
            ],
            [
                20,
                1
            ],
            [
                20,
                1
            ],
            [
                20,
                1
            ],
            [
                20,
                1
            ],
            [
                56,
                1
            ],
            [
                56,
                1
            ],
            [
                79,
                2
            ],
            [
                78,
                1
            ],
            [
                86,
                3
            ],
            [
                86,
                1
            ],
            [
                6,
                0
            ],
            [
                6,
                2
            ],
            [
                17,
                0
            ],
            [
                17,
                2
            ],
            [
                21,
                0
            ],
            [
                21,
                2
            ],
            [
                22,
                0
            ],
            [
                22,
                1
            ],
            [
                25,
                0
            ],
            [
                25,
                1
            ],
            [
                28,
                0
            ],
            [
                28,
                1
            ],
            [
                30,
                0
            ],
            [
                30,
                2
            ],
            [
                31,
                0
            ],
            [
                31,
                1
            ],
            [
                32,
                0
            ],
            [
                32,
                1
            ],
            [
                35,
                0
            ],
            [
                35,
                2
            ],
            [
                36,
                0
            ],
            [
                36,
                1
            ],
            [
                37,
                0
            ],
            [
                37,
                1
            ],
            [
                40,
                0
            ],
            [
                40,
                2
            ],
            [
                41,
                0
            ],
            [
                41,
                1
            ],
            [
                42,
                0
            ],
            [
                42,
                1
            ],
            [
                46,
                0
            ],
            [
                46,
                1
            ],
            [
                49,
                0
            ],
            [
                49,
                2
            ],
            [
                50,
                0
            ],
            [
                50,
                1
            ],
            [
                52,
                0
            ],
            [
                52,
                2
            ],
            [
                53,
                0
            ],
            [
                53,
                1
            ],
            [
                57,
                0
            ],
            [
                57,
                2
            ],
            [
                58,
                0
            ],
            [
                58,
                1
            ],
            [
                61,
                0
            ],
            [
                61,
                2
            ],
            [
                62,
                0
            ],
            [
                62,
                1
            ],
            [
                66,
                0
            ],
            [
                66,
                2
            ],
            [
                67,
                0
            ],
            [
                67,
                1
            ],
            [
                70,
                1
            ],
            [
                70,
                2
            ],
            [
                76,
                1
            ],
            [
                76,
                2
            ]
        ],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
            var $0 = $$.length - 1;
            switch(yystate){
                case 1:
                    return $$[$0 - 1];
                case 2:
                    this.$ = yy.prepareProgram($$[$0]);
                    break;
                case 3:
                    this.$ = $$[$0];
                    break;
                case 4:
                    this.$ = $$[$0];
                    break;
                case 5:
                    this.$ = $$[$0];
                    break;
                case 6:
                    this.$ = $$[$0];
                    break;
                case 7:
                    this.$ = $$[$0];
                    break;
                case 8:
                    this.$ = $$[$0];
                    break;
                case 9:
                    this.$ = {
                        type: "CommentStatement",
                        value: yy.stripComment($$[$0]),
                        strip: yy.stripFlags($$[$0], $$[$0]),
                        loc: yy.locInfo(this._$)
                    };
                    break;
                case 10:
                    this.$ = {
                        type: "ContentStatement",
                        original: $$[$0],
                        value: $$[$0],
                        loc: yy.locInfo(this._$)
                    };
                    break;
                case 11:
                    this.$ = yy.prepareRawBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
                    break;
                case 12:
                    this.$ = {
                        path: $$[$0 - 3],
                        params: $$[$0 - 2],
                        hash: $$[$0 - 1]
                    };
                    break;
                case 13:
                    this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], false, this._$);
                    break;
                case 14:
                    this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], true, this._$);
                    break;
                case 15:
                    this.$ = {
                        open: $$[$0 - 5],
                        path: $$[$0 - 4],
                        params: $$[$0 - 3],
                        hash: $$[$0 - 2],
                        blockParams: $$[$0 - 1],
                        strip: yy.stripFlags($$[$0 - 5], $$[$0])
                    };
                    break;
                case 16:
                    this.$ = {
                        path: $$[$0 - 4],
                        params: $$[$0 - 3],
                        hash: $$[$0 - 2],
                        blockParams: $$[$0 - 1],
                        strip: yy.stripFlags($$[$0 - 5], $$[$0])
                    };
                    break;
                case 17:
                    this.$ = {
                        path: $$[$0 - 4],
                        params: $$[$0 - 3],
                        hash: $$[$0 - 2],
                        blockParams: $$[$0 - 1],
                        strip: yy.stripFlags($$[$0 - 5], $$[$0])
                    };
                    break;
                case 18:
                    this.$ = {
                        strip: yy.stripFlags($$[$0 - 1], $$[$0 - 1]),
                        program: $$[$0]
                    };
                    break;
                case 19:
                    var inverse = yy.prepareBlock($$[$0 - 2], $$[$0 - 1], $$[$0], $$[$0], false, this._$), program = yy.prepareProgram([
                        inverse
                    ], $$[$0 - 1].loc);
                    program.chained = true;
                    this.$ = {
                        strip: $$[$0 - 2].strip,
                        program: program,
                        chain: true
                    };
                    break;
                case 20:
                    this.$ = $$[$0];
                    break;
                case 21:
                    this.$ = {
                        path: $$[$0 - 1],
                        strip: yy.stripFlags($$[$0 - 2], $$[$0])
                    };
                    break;
                case 22:
                    this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
                    break;
                case 23:
                    this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
                    break;
                case 24:
                    this.$ = {
                        type: "PartialStatement",
                        name: $$[$0 - 3],
                        params: $$[$0 - 2],
                        hash: $$[$0 - 1],
                        indent: "",
                        strip: yy.stripFlags($$[$0 - 4], $$[$0]),
                        loc: yy.locInfo(this._$)
                    };
                    break;
                case 25:
                    this.$ = yy.preparePartialBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
                    break;
                case 26:
                    this.$ = {
                        path: $$[$0 - 3],
                        params: $$[$0 - 2],
                        hash: $$[$0 - 1],
                        strip: yy.stripFlags($$[$0 - 4], $$[$0])
                    };
                    break;
                case 27:
                    this.$ = $$[$0];
                    break;
                case 28:
                    this.$ = $$[$0];
                    break;
                case 29:
                    this.$ = {
                        type: "SubExpression",
                        path: $$[$0 - 3],
                        params: $$[$0 - 2],
                        hash: $$[$0 - 1],
                        loc: yy.locInfo(this._$)
                    };
                    break;
                case 30:
                    this.$ = {
                        type: "Hash",
                        pairs: $$[$0],
                        loc: yy.locInfo(this._$)
                    };
                    break;
                case 31:
                    this.$ = {
                        type: "HashPair",
                        key: yy.id($$[$0 - 2]),
                        value: $$[$0],
                        loc: yy.locInfo(this._$)
                    };
                    break;
                case 32:
                    this.$ = yy.id($$[$0 - 1]);
                    break;
                case 33:
                    this.$ = $$[$0];
                    break;
                case 34:
                    this.$ = $$[$0];
                    break;
                case 35:
                    this.$ = {
                        type: "StringLiteral",
                        value: $$[$0],
                        original: $$[$0],
                        loc: yy.locInfo(this._$)
                    };
                    break;
                case 36:
                    this.$ = {
                        type: "NumberLiteral",
                        value: Number($$[$0]),
                        original: Number($$[$0]),
                        loc: yy.locInfo(this._$)
                    };
                    break;
                case 37:
                    this.$ = {
                        type: "BooleanLiteral",
                        value: $$[$0] === "true",
                        original: $$[$0] === "true",
                        loc: yy.locInfo(this._$)
                    };
                    break;
                case 38:
                    this.$ = {
                        type: "UndefinedLiteral",
                        original: undefined,
                        value: undefined,
                        loc: yy.locInfo(this._$)
                    };
                    break;
                case 39:
                    this.$ = {
                        type: "NullLiteral",
                        original: null,
                        value: null,
                        loc: yy.locInfo(this._$)
                    };
                    break;
                case 40:
                    this.$ = $$[$0];
                    break;
                case 41:
                    this.$ = $$[$0];
                    break;
                case 42:
                    this.$ = yy.preparePath(true, $$[$0], this._$);
                    break;
                case 43:
                    this.$ = yy.preparePath(false, $$[$0], this._$);
                    break;
                case 44:
                    $$[$0 - 2].push({
                        part: yy.id($$[$0]),
                        original: $$[$0],
                        separator: $$[$0 - 1]
                    });
                    this.$ = $$[$0 - 2];
                    break;
                case 45:
                    this.$ = [
                        {
                            part: yy.id($$[$0]),
                            original: $$[$0]
                        }
                    ];
                    break;
                case 46:
                    this.$ = [];
                    break;
                case 47:
                    $$[$0 - 1].push($$[$0]);
                    break;
                case 48:
                    this.$ = [];
                    break;
                case 49:
                    $$[$0 - 1].push($$[$0]);
                    break;
                case 50:
                    this.$ = [];
                    break;
                case 51:
                    $$[$0 - 1].push($$[$0]);
                    break;
                case 58:
                    this.$ = [];
                    break;
                case 59:
                    $$[$0 - 1].push($$[$0]);
                    break;
                case 64:
                    this.$ = [];
                    break;
                case 65:
                    $$[$0 - 1].push($$[$0]);
                    break;
                case 70:
                    this.$ = [];
                    break;
                case 71:
                    $$[$0 - 1].push($$[$0]);
                    break;
                case 78:
                    this.$ = [];
                    break;
                case 79:
                    $$[$0 - 1].push($$[$0]);
                    break;
                case 82:
                    this.$ = [];
                    break;
                case 83:
                    $$[$0 - 1].push($$[$0]);
                    break;
                case 86:
                    this.$ = [];
                    break;
                case 87:
                    $$[$0 - 1].push($$[$0]);
                    break;
                case 90:
                    this.$ = [];
                    break;
                case 91:
                    $$[$0 - 1].push($$[$0]);
                    break;
                case 94:
                    this.$ = [];
                    break;
                case 95:
                    $$[$0 - 1].push($$[$0]);
                    break;
                case 98:
                    this.$ = [
                        $$[$0]
                    ];
                    break;
                case 99:
                    $$[$0 - 1].push($$[$0]);
                    break;
                case 100:
                    this.$ = [
                        $$[$0]
                    ];
                    break;
                case 101:
                    $$[$0 - 1].push($$[$0]);
                    break;
            }
        },
        table: [
            {
                3: 1,
                4: 2,
                5: [
                    2,
                    46
                ],
                6: 3,
                14: [
                    2,
                    46
                ],
                15: [
                    2,
                    46
                ],
                19: [
                    2,
                    46
                ],
                29: [
                    2,
                    46
                ],
                34: [
                    2,
                    46
                ],
                48: [
                    2,
                    46
                ],
                51: [
                    2,
                    46
                ],
                55: [
                    2,
                    46
                ],
                60: [
                    2,
                    46
                ]
            },
            {
                1: [
                    3
                ]
            },
            {
                5: [
                    1,
                    4
                ]
            },
            {
                5: [
                    2,
                    2
                ],
                7: 5,
                8: 6,
                9: 7,
                10: 8,
                11: 9,
                12: 10,
                13: 11,
                14: [
                    1,
                    12
                ],
                15: [
                    1,
                    20
                ],
                16: 17,
                19: [
                    1,
                    23
                ],
                24: 15,
                27: 16,
                29: [
                    1,
                    21
                ],
                34: [
                    1,
                    22
                ],
                39: [
                    2,
                    2
                ],
                44: [
                    2,
                    2
                ],
                47: [
                    2,
                    2
                ],
                48: [
                    1,
                    13
                ],
                51: [
                    1,
                    14
                ],
                55: [
                    1,
                    18
                ],
                59: 19,
                60: [
                    1,
                    24
                ]
            },
            {
                1: [
                    2,
                    1
                ]
            },
            {
                5: [
                    2,
                    47
                ],
                14: [
                    2,
                    47
                ],
                15: [
                    2,
                    47
                ],
                19: [
                    2,
                    47
                ],
                29: [
                    2,
                    47
                ],
                34: [
                    2,
                    47
                ],
                39: [
                    2,
                    47
                ],
                44: [
                    2,
                    47
                ],
                47: [
                    2,
                    47
                ],
                48: [
                    2,
                    47
                ],
                51: [
                    2,
                    47
                ],
                55: [
                    2,
                    47
                ],
                60: [
                    2,
                    47
                ]
            },
            {
                5: [
                    2,
                    3
                ],
                14: [
                    2,
                    3
                ],
                15: [
                    2,
                    3
                ],
                19: [
                    2,
                    3
                ],
                29: [
                    2,
                    3
                ],
                34: [
                    2,
                    3
                ],
                39: [
                    2,
                    3
                ],
                44: [
                    2,
                    3
                ],
                47: [
                    2,
                    3
                ],
                48: [
                    2,
                    3
                ],
                51: [
                    2,
                    3
                ],
                55: [
                    2,
                    3
                ],
                60: [
                    2,
                    3
                ]
            },
            {
                5: [
                    2,
                    4
                ],
                14: [
                    2,
                    4
                ],
                15: [
                    2,
                    4
                ],
                19: [
                    2,
                    4
                ],
                29: [
                    2,
                    4
                ],
                34: [
                    2,
                    4
                ],
                39: [
                    2,
                    4
                ],
                44: [
                    2,
                    4
                ],
                47: [
                    2,
                    4
                ],
                48: [
                    2,
                    4
                ],
                51: [
                    2,
                    4
                ],
                55: [
                    2,
                    4
                ],
                60: [
                    2,
                    4
                ]
            },
            {
                5: [
                    2,
                    5
                ],
                14: [
                    2,
                    5
                ],
                15: [
                    2,
                    5
                ],
                19: [
                    2,
                    5
                ],
                29: [
                    2,
                    5
                ],
                34: [
                    2,
                    5
                ],
                39: [
                    2,
                    5
                ],
                44: [
                    2,
                    5
                ],
                47: [
                    2,
                    5
                ],
                48: [
                    2,
                    5
                ],
                51: [
                    2,
                    5
                ],
                55: [
                    2,
                    5
                ],
                60: [
                    2,
                    5
                ]
            },
            {
                5: [
                    2,
                    6
                ],
                14: [
                    2,
                    6
                ],
                15: [
                    2,
                    6
                ],
                19: [
                    2,
                    6
                ],
                29: [
                    2,
                    6
                ],
                34: [
                    2,
                    6
                ],
                39: [
                    2,
                    6
                ],
                44: [
                    2,
                    6
                ],
                47: [
                    2,
                    6
                ],
                48: [
                    2,
                    6
                ],
                51: [
                    2,
                    6
                ],
                55: [
                    2,
                    6
                ],
                60: [
                    2,
                    6
                ]
            },
            {
                5: [
                    2,
                    7
                ],
                14: [
                    2,
                    7
                ],
                15: [
                    2,
                    7
                ],
                19: [
                    2,
                    7
                ],
                29: [
                    2,
                    7
                ],
                34: [
                    2,
                    7
                ],
                39: [
                    2,
                    7
                ],
                44: [
                    2,
                    7
                ],
                47: [
                    2,
                    7
                ],
                48: [
                    2,
                    7
                ],
                51: [
                    2,
                    7
                ],
                55: [
                    2,
                    7
                ],
                60: [
                    2,
                    7
                ]
            },
            {
                5: [
                    2,
                    8
                ],
                14: [
                    2,
                    8
                ],
                15: [
                    2,
                    8
                ],
                19: [
                    2,
                    8
                ],
                29: [
                    2,
                    8
                ],
                34: [
                    2,
                    8
                ],
                39: [
                    2,
                    8
                ],
                44: [
                    2,
                    8
                ],
                47: [
                    2,
                    8
                ],
                48: [
                    2,
                    8
                ],
                51: [
                    2,
                    8
                ],
                55: [
                    2,
                    8
                ],
                60: [
                    2,
                    8
                ]
            },
            {
                5: [
                    2,
                    9
                ],
                14: [
                    2,
                    9
                ],
                15: [
                    2,
                    9
                ],
                19: [
                    2,
                    9
                ],
                29: [
                    2,
                    9
                ],
                34: [
                    2,
                    9
                ],
                39: [
                    2,
                    9
                ],
                44: [
                    2,
                    9
                ],
                47: [
                    2,
                    9
                ],
                48: [
                    2,
                    9
                ],
                51: [
                    2,
                    9
                ],
                55: [
                    2,
                    9
                ],
                60: [
                    2,
                    9
                ]
            },
            {
                20: 25,
                72: [
                    1,
                    35
                ],
                78: 26,
                79: 27,
                80: [
                    1,
                    28
                ],
                81: [
                    1,
                    29
                ],
                82: [
                    1,
                    30
                ],
                83: [
                    1,
                    31
                ],
                84: [
                    1,
                    32
                ],
                85: [
                    1,
                    34
                ],
                86: 33
            },
            {
                20: 36,
                72: [
                    1,
                    35
                ],
                78: 26,
                79: 27,
                80: [
                    1,
                    28
                ],
                81: [
                    1,
                    29
                ],
                82: [
                    1,
                    30
                ],
                83: [
                    1,
                    31
                ],
                84: [
                    1,
                    32
                ],
                85: [
                    1,
                    34
                ],
                86: 33
            },
            {
                4: 37,
                6: 3,
                14: [
                    2,
                    46
                ],
                15: [
                    2,
                    46
                ],
                19: [
                    2,
                    46
                ],
                29: [
                    2,
                    46
                ],
                34: [
                    2,
                    46
                ],
                39: [
                    2,
                    46
                ],
                44: [
                    2,
                    46
                ],
                47: [
                    2,
                    46
                ],
                48: [
                    2,
                    46
                ],
                51: [
                    2,
                    46
                ],
                55: [
                    2,
                    46
                ],
                60: [
                    2,
                    46
                ]
            },
            {
                4: 38,
                6: 3,
                14: [
                    2,
                    46
                ],
                15: [
                    2,
                    46
                ],
                19: [
                    2,
                    46
                ],
                29: [
                    2,
                    46
                ],
                34: [
                    2,
                    46
                ],
                44: [
                    2,
                    46
                ],
                47: [
                    2,
                    46
                ],
                48: [
                    2,
                    46
                ],
                51: [
                    2,
                    46
                ],
                55: [
                    2,
                    46
                ],
                60: [
                    2,
                    46
                ]
            },
            {
                15: [
                    2,
                    48
                ],
                17: 39,
                18: [
                    2,
                    48
                ]
            },
            {
                20: 41,
                56: 40,
                64: 42,
                65: [
                    1,
                    43
                ],
                72: [
                    1,
                    35
                ],
                78: 26,
                79: 27,
                80: [
                    1,
                    28
                ],
                81: [
                    1,
                    29
                ],
                82: [
                    1,
                    30
                ],
                83: [
                    1,
                    31
                ],
                84: [
                    1,
                    32
                ],
                85: [
                    1,
                    34
                ],
                86: 33
            },
            {
                4: 44,
                6: 3,
                14: [
                    2,
                    46
                ],
                15: [
                    2,
                    46
                ],
                19: [
                    2,
                    46
                ],
                29: [
                    2,
                    46
                ],
                34: [
                    2,
                    46
                ],
                47: [
                    2,
                    46
                ],
                48: [
                    2,
                    46
                ],
                51: [
                    2,
                    46
                ],
                55: [
                    2,
                    46
                ],
                60: [
                    2,
                    46
                ]
            },
            {
                5: [
                    2,
                    10
                ],
                14: [
                    2,
                    10
                ],
                15: [
                    2,
                    10
                ],
                18: [
                    2,
                    10
                ],
                19: [
                    2,
                    10
                ],
                29: [
                    2,
                    10
                ],
                34: [
                    2,
                    10
                ],
                39: [
                    2,
                    10
                ],
                44: [
                    2,
                    10
                ],
                47: [
                    2,
                    10
                ],
                48: [
                    2,
                    10
                ],
                51: [
                    2,
                    10
                ],
                55: [
                    2,
                    10
                ],
                60: [
                    2,
                    10
                ]
            },
            {
                20: 45,
                72: [
                    1,
                    35
                ],
                78: 26,
                79: 27,
                80: [
                    1,
                    28
                ],
                81: [
                    1,
                    29
                ],
                82: [
                    1,
                    30
                ],
                83: [
                    1,
                    31
                ],
                84: [
                    1,
                    32
                ],
                85: [
                    1,
                    34
                ],
                86: 33
            },
            {
                20: 46,
                72: [
                    1,
                    35
                ],
                78: 26,
                79: 27,
                80: [
                    1,
                    28
                ],
                81: [
                    1,
                    29
                ],
                82: [
                    1,
                    30
                ],
                83: [
                    1,
                    31
                ],
                84: [
                    1,
                    32
                ],
                85: [
                    1,
                    34
                ],
                86: 33
            },
            {
                20: 47,
                72: [
                    1,
                    35
                ],
                78: 26,
                79: 27,
                80: [
                    1,
                    28
                ],
                81: [
                    1,
                    29
                ],
                82: [
                    1,
                    30
                ],
                83: [
                    1,
                    31
                ],
                84: [
                    1,
                    32
                ],
                85: [
                    1,
                    34
                ],
                86: 33
            },
            {
                20: 41,
                56: 48,
                64: 42,
                65: [
                    1,
                    43
                ],
                72: [
                    1,
                    35
                ],
                78: 26,
                79: 27,
                80: [
                    1,
                    28
                ],
                81: [
                    1,
                    29
                ],
                82: [
                    1,
                    30
                ],
                83: [
                    1,
                    31
                ],
                84: [
                    1,
                    32
                ],
                85: [
                    1,
                    34
                ],
                86: 33
            },
            {
                33: [
                    2,
                    78
                ],
                49: 49,
                65: [
                    2,
                    78
                ],
                72: [
                    2,
                    78
                ],
                80: [
                    2,
                    78
                ],
                81: [
                    2,
                    78
                ],
                82: [
                    2,
                    78
                ],
                83: [
                    2,
                    78
                ],
                84: [
                    2,
                    78
                ],
                85: [
                    2,
                    78
                ]
            },
            {
                23: [
                    2,
                    33
                ],
                33: [
                    2,
                    33
                ],
                54: [
                    2,
                    33
                ],
                65: [
                    2,
                    33
                ],
                68: [
                    2,
                    33
                ],
                72: [
                    2,
                    33
                ],
                75: [
                    2,
                    33
                ],
                80: [
                    2,
                    33
                ],
                81: [
                    2,
                    33
                ],
                82: [
                    2,
                    33
                ],
                83: [
                    2,
                    33
                ],
                84: [
                    2,
                    33
                ],
                85: [
                    2,
                    33
                ]
            },
            {
                23: [
                    2,
                    34
                ],
                33: [
                    2,
                    34
                ],
                54: [
                    2,
                    34
                ],
                65: [
                    2,
                    34
                ],
                68: [
                    2,
                    34
                ],
                72: [
                    2,
                    34
                ],
                75: [
                    2,
                    34
                ],
                80: [
                    2,
                    34
                ],
                81: [
                    2,
                    34
                ],
                82: [
                    2,
                    34
                ],
                83: [
                    2,
                    34
                ],
                84: [
                    2,
                    34
                ],
                85: [
                    2,
                    34
                ]
            },
            {
                23: [
                    2,
                    35
                ],
                33: [
                    2,
                    35
                ],
                54: [
                    2,
                    35
                ],
                65: [
                    2,
                    35
                ],
                68: [
                    2,
                    35
                ],
                72: [
                    2,
                    35
                ],
                75: [
                    2,
                    35
                ],
                80: [
                    2,
                    35
                ],
                81: [
                    2,
                    35
                ],
                82: [
                    2,
                    35
                ],
                83: [
                    2,
                    35
                ],
                84: [
                    2,
                    35
                ],
                85: [
                    2,
                    35
                ]
            },
            {
                23: [
                    2,
                    36
                ],
                33: [
                    2,
                    36
                ],
                54: [
                    2,
                    36
                ],
                65: [
                    2,
                    36
                ],
                68: [
                    2,
                    36
                ],
                72: [
                    2,
                    36
                ],
                75: [
                    2,
                    36
                ],
                80: [
                    2,
                    36
                ],
                81: [
                    2,
                    36
                ],
                82: [
                    2,
                    36
                ],
                83: [
                    2,
                    36
                ],
                84: [
                    2,
                    36
                ],
                85: [
                    2,
                    36
                ]
            },
            {
                23: [
                    2,
                    37
                ],
                33: [
                    2,
                    37
                ],
                54: [
                    2,
                    37
                ],
                65: [
                    2,
                    37
                ],
                68: [
                    2,
                    37
                ],
                72: [
                    2,
                    37
                ],
                75: [
                    2,
                    37
                ],
                80: [
                    2,
                    37
                ],
                81: [
                    2,
                    37
                ],
                82: [
                    2,
                    37
                ],
                83: [
                    2,
                    37
                ],
                84: [
                    2,
                    37
                ],
                85: [
                    2,
                    37
                ]
            },
            {
                23: [
                    2,
                    38
                ],
                33: [
                    2,
                    38
                ],
                54: [
                    2,
                    38
                ],
                65: [
                    2,
                    38
                ],
                68: [
                    2,
                    38
                ],
                72: [
                    2,
                    38
                ],
                75: [
                    2,
                    38
                ],
                80: [
                    2,
                    38
                ],
                81: [
                    2,
                    38
                ],
                82: [
                    2,
                    38
                ],
                83: [
                    2,
                    38
                ],
                84: [
                    2,
                    38
                ],
                85: [
                    2,
                    38
                ]
            },
            {
                23: [
                    2,
                    39
                ],
                33: [
                    2,
                    39
                ],
                54: [
                    2,
                    39
                ],
                65: [
                    2,
                    39
                ],
                68: [
                    2,
                    39
                ],
                72: [
                    2,
                    39
                ],
                75: [
                    2,
                    39
                ],
                80: [
                    2,
                    39
                ],
                81: [
                    2,
                    39
                ],
                82: [
                    2,
                    39
                ],
                83: [
                    2,
                    39
                ],
                84: [
                    2,
                    39
                ],
                85: [
                    2,
                    39
                ]
            },
            {
                23: [
                    2,
                    43
                ],
                33: [
                    2,
                    43
                ],
                54: [
                    2,
                    43
                ],
                65: [
                    2,
                    43
                ],
                68: [
                    2,
                    43
                ],
                72: [
                    2,
                    43
                ],
                75: [
                    2,
                    43
                ],
                80: [
                    2,
                    43
                ],
                81: [
                    2,
                    43
                ],
                82: [
                    2,
                    43
                ],
                83: [
                    2,
                    43
                ],
                84: [
                    2,
                    43
                ],
                85: [
                    2,
                    43
                ],
                87: [
                    1,
                    50
                ]
            },
            {
                72: [
                    1,
                    35
                ],
                86: 51
            },
            {
                23: [
                    2,
                    45
                ],
                33: [
                    2,
                    45
                ],
                54: [
                    2,
                    45
                ],
                65: [
                    2,
                    45
                ],
                68: [
                    2,
                    45
                ],
                72: [
                    2,
                    45
                ],
                75: [
                    2,
                    45
                ],
                80: [
                    2,
                    45
                ],
                81: [
                    2,
                    45
                ],
                82: [
                    2,
                    45
                ],
                83: [
                    2,
                    45
                ],
                84: [
                    2,
                    45
                ],
                85: [
                    2,
                    45
                ],
                87: [
                    2,
                    45
                ]
            },
            {
                52: 52,
                54: [
                    2,
                    82
                ],
                65: [
                    2,
                    82
                ],
                72: [
                    2,
                    82
                ],
                80: [
                    2,
                    82
                ],
                81: [
                    2,
                    82
                ],
                82: [
                    2,
                    82
                ],
                83: [
                    2,
                    82
                ],
                84: [
                    2,
                    82
                ],
                85: [
                    2,
                    82
                ]
            },
            {
                25: 53,
                38: 55,
                39: [
                    1,
                    57
                ],
                43: 56,
                44: [
                    1,
                    58
                ],
                45: 54,
                47: [
                    2,
                    54
                ]
            },
            {
                28: 59,
                43: 60,
                44: [
                    1,
                    58
                ],
                47: [
                    2,
                    56
                ]
            },
            {
                13: 62,
                15: [
                    1,
                    20
                ],
                18: [
                    1,
                    61
                ]
            },
            {
                33: [
                    2,
                    86
                ],
                57: 63,
                65: [
                    2,
                    86
                ],
                72: [
                    2,
                    86
                ],
                80: [
                    2,
                    86
                ],
                81: [
                    2,
                    86
                ],
                82: [
                    2,
                    86
                ],
                83: [
                    2,
                    86
                ],
                84: [
                    2,
                    86
                ],
                85: [
                    2,
                    86
                ]
            },
            {
                33: [
                    2,
                    40
                ],
                65: [
                    2,
                    40
                ],
                72: [
                    2,
                    40
                ],
                80: [
                    2,
                    40
                ],
                81: [
                    2,
                    40
                ],
                82: [
                    2,
                    40
                ],
                83: [
                    2,
                    40
                ],
                84: [
                    2,
                    40
                ],
                85: [
                    2,
                    40
                ]
            },
            {
                33: [
                    2,
                    41
                ],
                65: [
                    2,
                    41
                ],
                72: [
                    2,
                    41
                ],
                80: [
                    2,
                    41
                ],
                81: [
                    2,
                    41
                ],
                82: [
                    2,
                    41
                ],
                83: [
                    2,
                    41
                ],
                84: [
                    2,
                    41
                ],
                85: [
                    2,
                    41
                ]
            },
            {
                20: 64,
                72: [
                    1,
                    35
                ],
                78: 26,
                79: 27,
                80: [
                    1,
                    28
                ],
                81: [
                    1,
                    29
                ],
                82: [
                    1,
                    30
                ],
                83: [
                    1,
                    31
                ],
                84: [
                    1,
                    32
                ],
                85: [
                    1,
                    34
                ],
                86: 33
            },
            {
                26: 65,
                47: [
                    1,
                    66
                ]
            },
            {
                30: 67,
                33: [
                    2,
                    58
                ],
                65: [
                    2,
                    58
                ],
                72: [
                    2,
                    58
                ],
                75: [
                    2,
                    58
                ],
                80: [
                    2,
                    58
                ],
                81: [
                    2,
                    58
                ],
                82: [
                    2,
                    58
                ],
                83: [
                    2,
                    58
                ],
                84: [
                    2,
                    58
                ],
                85: [
                    2,
                    58
                ]
            },
            {
                33: [
                    2,
                    64
                ],
                35: 68,
                65: [
                    2,
                    64
                ],
                72: [
                    2,
                    64
                ],
                75: [
                    2,
                    64
                ],
                80: [
                    2,
                    64
                ],
                81: [
                    2,
                    64
                ],
                82: [
                    2,
                    64
                ],
                83: [
                    2,
                    64
                ],
                84: [
                    2,
                    64
                ],
                85: [
                    2,
                    64
                ]
            },
            {
                21: 69,
                23: [
                    2,
                    50
                ],
                65: [
                    2,
                    50
                ],
                72: [
                    2,
                    50
                ],
                80: [
                    2,
                    50
                ],
                81: [
                    2,
                    50
                ],
                82: [
                    2,
                    50
                ],
                83: [
                    2,
                    50
                ],
                84: [
                    2,
                    50
                ],
                85: [
                    2,
                    50
                ]
            },
            {
                33: [
                    2,
                    90
                ],
                61: 70,
                65: [
                    2,
                    90
                ],
                72: [
                    2,
                    90
                ],
                80: [
                    2,
                    90
                ],
                81: [
                    2,
                    90
                ],
                82: [
                    2,
                    90
                ],
                83: [
                    2,
                    90
                ],
                84: [
                    2,
                    90
                ],
                85: [
                    2,
                    90
                ]
            },
            {
                20: 74,
                33: [
                    2,
                    80
                ],
                50: 71,
                63: 72,
                64: 75,
                65: [
                    1,
                    43
                ],
                69: 73,
                70: 76,
                71: 77,
                72: [
                    1,
                    78
                ],
                78: 26,
                79: 27,
                80: [
                    1,
                    28
                ],
                81: [
                    1,
                    29
                ],
                82: [
                    1,
                    30
                ],
                83: [
                    1,
                    31
                ],
                84: [
                    1,
                    32
                ],
                85: [
                    1,
                    34
                ],
                86: 33
            },
            {
                72: [
                    1,
                    79
                ]
            },
            {
                23: [
                    2,
                    42
                ],
                33: [
                    2,
                    42
                ],
                54: [
                    2,
                    42
                ],
                65: [
                    2,
                    42
                ],
                68: [
                    2,
                    42
                ],
                72: [
                    2,
                    42
                ],
                75: [
                    2,
                    42
                ],
                80: [
                    2,
                    42
                ],
                81: [
                    2,
                    42
                ],
                82: [
                    2,
                    42
                ],
                83: [
                    2,
                    42
                ],
                84: [
                    2,
                    42
                ],
                85: [
                    2,
                    42
                ],
                87: [
                    1,
                    50
                ]
            },
            {
                20: 74,
                53: 80,
                54: [
                    2,
                    84
                ],
                63: 81,
                64: 75,
                65: [
                    1,
                    43
                ],
                69: 82,
                70: 76,
                71: 77,
                72: [
                    1,
                    78
                ],
                78: 26,
                79: 27,
                80: [
                    1,
                    28
                ],
                81: [
                    1,
                    29
                ],
                82: [
                    1,
                    30
                ],
                83: [
                    1,
                    31
                ],
                84: [
                    1,
                    32
                ],
                85: [
                    1,
                    34
                ],
                86: 33
            },
            {
                26: 83,
                47: [
                    1,
                    66
                ]
            },
            {
                47: [
                    2,
                    55
                ]
            },
            {
                4: 84,
                6: 3,
                14: [
                    2,
                    46
                ],
                15: [
                    2,
                    46
                ],
                19: [
                    2,
                    46
                ],
                29: [
                    2,
                    46
                ],
                34: [
                    2,
                    46
                ],
                39: [
                    2,
                    46
                ],
                44: [
                    2,
                    46
                ],
                47: [
                    2,
                    46
                ],
                48: [
                    2,
                    46
                ],
                51: [
                    2,
                    46
                ],
                55: [
                    2,
                    46
                ],
                60: [
                    2,
                    46
                ]
            },
            {
                47: [
                    2,
                    20
                ]
            },
            {
                20: 85,
                72: [
                    1,
                    35
                ],
                78: 26,
                79: 27,
                80: [
                    1,
                    28
                ],
                81: [
                    1,
                    29
                ],
                82: [
                    1,
                    30
                ],
                83: [
                    1,
                    31
                ],
                84: [
                    1,
                    32
                ],
                85: [
                    1,
                    34
                ],
                86: 33
            },
            {
                4: 86,
                6: 3,
                14: [
                    2,
                    46
                ],
                15: [
                    2,
                    46
                ],
                19: [
                    2,
                    46
                ],
                29: [
                    2,
                    46
                ],
                34: [
                    2,
                    46
                ],
                47: [
                    2,
                    46
                ],
                48: [
                    2,
                    46
                ],
                51: [
                    2,
                    46
                ],
                55: [
                    2,
                    46
                ],
                60: [
                    2,
                    46
                ]
            },
            {
                26: 87,
                47: [
                    1,
                    66
                ]
            },
            {
                47: [
                    2,
                    57
                ]
            },
            {
                5: [
                    2,
                    11
                ],
                14: [
                    2,
                    11
                ],
                15: [
                    2,
                    11
                ],
                19: [
                    2,
                    11
                ],
                29: [
                    2,
                    11
                ],
                34: [
                    2,
                    11
                ],
                39: [
                    2,
                    11
                ],
                44: [
                    2,
                    11
                ],
                47: [
                    2,
                    11
                ],
                48: [
                    2,
                    11
                ],
                51: [
                    2,
                    11
                ],
                55: [
                    2,
                    11
                ],
                60: [
                    2,
                    11
                ]
            },
            {
                15: [
                    2,
                    49
                ],
                18: [
                    2,
                    49
                ]
            },
            {
                20: 74,
                33: [
                    2,
                    88
                ],
                58: 88,
                63: 89,
                64: 75,
                65: [
                    1,
                    43
                ],
                69: 90,
                70: 76,
                71: 77,
                72: [
                    1,
                    78
                ],
                78: 26,
                79: 27,
                80: [
                    1,
                    28
                ],
                81: [
                    1,
                    29
                ],
                82: [
                    1,
                    30
                ],
                83: [
                    1,
                    31
                ],
                84: [
                    1,
                    32
                ],
                85: [
                    1,
                    34
                ],
                86: 33
            },
            {
                65: [
                    2,
                    94
                ],
                66: 91,
                68: [
                    2,
                    94
                ],
                72: [
                    2,
                    94
                ],
                80: [
                    2,
                    94
                ],
                81: [
                    2,
                    94
                ],
                82: [
                    2,
                    94
                ],
                83: [
                    2,
                    94
                ],
                84: [
                    2,
                    94
                ],
                85: [
                    2,
                    94
                ]
            },
            {
                5: [
                    2,
                    25
                ],
                14: [
                    2,
                    25
                ],
                15: [
                    2,
                    25
                ],
                19: [
                    2,
                    25
                ],
                29: [
                    2,
                    25
                ],
                34: [
                    2,
                    25
                ],
                39: [
                    2,
                    25
                ],
                44: [
                    2,
                    25
                ],
                47: [
                    2,
                    25
                ],
                48: [
                    2,
                    25
                ],
                51: [
                    2,
                    25
                ],
                55: [
                    2,
                    25
                ],
                60: [
                    2,
                    25
                ]
            },
            {
                20: 92,
                72: [
                    1,
                    35
                ],
                78: 26,
                79: 27,
                80: [
                    1,
                    28
                ],
                81: [
                    1,
                    29
                ],
                82: [
                    1,
                    30
                ],
                83: [
                    1,
                    31
                ],
                84: [
                    1,
                    32
                ],
                85: [
                    1,
                    34
                ],
                86: 33
            },
            {
                20: 74,
                31: 93,
                33: [
                    2,
                    60
                ],
                63: 94,
                64: 75,
                65: [
                    1,
                    43
                ],
                69: 95,
                70: 76,
                71: 77,
                72: [
                    1,
                    78
                ],
                75: [
                    2,
                    60
                ],
                78: 26,
                79: 27,
                80: [
                    1,
                    28
                ],
                81: [
                    1,
                    29
                ],
                82: [
                    1,
                    30
                ],
                83: [
                    1,
                    31
                ],
                84: [
                    1,
                    32
                ],
                85: [
                    1,
                    34
                ],
                86: 33
            },
            {
                20: 74,
                33: [
                    2,
                    66
                ],
                36: 96,
                63: 97,
                64: 75,
                65: [
                    1,
                    43
                ],
                69: 98,
                70: 76,
                71: 77,
                72: [
                    1,
                    78
                ],
                75: [
                    2,
                    66
                ],
                78: 26,
                79: 27,
                80: [
                    1,
                    28
                ],
                81: [
                    1,
                    29
                ],
                82: [
                    1,
                    30
                ],
                83: [
                    1,
                    31
                ],
                84: [
                    1,
                    32
                ],
                85: [
                    1,
                    34
                ],
                86: 33
            },
            {
                20: 74,
                22: 99,
                23: [
                    2,
                    52
                ],
                63: 100,
                64: 75,
                65: [
                    1,
                    43
                ],
                69: 101,
                70: 76,
                71: 77,
                72: [
                    1,
                    78
                ],
                78: 26,
                79: 27,
                80: [
                    1,
                    28
                ],
                81: [
                    1,
                    29
                ],
                82: [
                    1,
                    30
                ],
                83: [
                    1,
                    31
                ],
                84: [
                    1,
                    32
                ],
                85: [
                    1,
                    34
                ],
                86: 33
            },
            {
                20: 74,
                33: [
                    2,
                    92
                ],
                62: 102,
                63: 103,
                64: 75,
                65: [
                    1,
                    43
                ],
                69: 104,
                70: 76,
                71: 77,
                72: [
                    1,
                    78
                ],
                78: 26,
                79: 27,
                80: [
                    1,
                    28
                ],
                81: [
                    1,
                    29
                ],
                82: [
                    1,
                    30
                ],
                83: [
                    1,
                    31
                ],
                84: [
                    1,
                    32
                ],
                85: [
                    1,
                    34
                ],
                86: 33
            },
            {
                33: [
                    1,
                    105
                ]
            },
            {
                33: [
                    2,
                    79
                ],
                65: [
                    2,
                    79
                ],
                72: [
                    2,
                    79
                ],
                80: [
                    2,
                    79
                ],
                81: [
                    2,
                    79
                ],
                82: [
                    2,
                    79
                ],
                83: [
                    2,
                    79
                ],
                84: [
                    2,
                    79
                ],
                85: [
                    2,
                    79
                ]
            },
            {
                33: [
                    2,
                    81
                ]
            },
            {
                23: [
                    2,
                    27
                ],
                33: [
                    2,
                    27
                ],
                54: [
                    2,
                    27
                ],
                65: [
                    2,
                    27
                ],
                68: [
                    2,
                    27
                ],
                72: [
                    2,
                    27
                ],
                75: [
                    2,
                    27
                ],
                80: [
                    2,
                    27
                ],
                81: [
                    2,
                    27
                ],
                82: [
                    2,
                    27
                ],
                83: [
                    2,
                    27
                ],
                84: [
                    2,
                    27
                ],
                85: [
                    2,
                    27
                ]
            },
            {
                23: [
                    2,
                    28
                ],
                33: [
                    2,
                    28
                ],
                54: [
                    2,
                    28
                ],
                65: [
                    2,
                    28
                ],
                68: [
                    2,
                    28
                ],
                72: [
                    2,
                    28
                ],
                75: [
                    2,
                    28
                ],
                80: [
                    2,
                    28
                ],
                81: [
                    2,
                    28
                ],
                82: [
                    2,
                    28
                ],
                83: [
                    2,
                    28
                ],
                84: [
                    2,
                    28
                ],
                85: [
                    2,
                    28
                ]
            },
            {
                23: [
                    2,
                    30
                ],
                33: [
                    2,
                    30
                ],
                54: [
                    2,
                    30
                ],
                68: [
                    2,
                    30
                ],
                71: 106,
                72: [
                    1,
                    107
                ],
                75: [
                    2,
                    30
                ]
            },
            {
                23: [
                    2,
                    98
                ],
                33: [
                    2,
                    98
                ],
                54: [
                    2,
                    98
                ],
                68: [
                    2,
                    98
                ],
                72: [
                    2,
                    98
                ],
                75: [
                    2,
                    98
                ]
            },
            {
                23: [
                    2,
                    45
                ],
                33: [
                    2,
                    45
                ],
                54: [
                    2,
                    45
                ],
                65: [
                    2,
                    45
                ],
                68: [
                    2,
                    45
                ],
                72: [
                    2,
                    45
                ],
                73: [
                    1,
                    108
                ],
                75: [
                    2,
                    45
                ],
                80: [
                    2,
                    45
                ],
                81: [
                    2,
                    45
                ],
                82: [
                    2,
                    45
                ],
                83: [
                    2,
                    45
                ],
                84: [
                    2,
                    45
                ],
                85: [
                    2,
                    45
                ],
                87: [
                    2,
                    45
                ]
            },
            {
                23: [
                    2,
                    44
                ],
                33: [
                    2,
                    44
                ],
                54: [
                    2,
                    44
                ],
                65: [
                    2,
                    44
                ],
                68: [
                    2,
                    44
                ],
                72: [
                    2,
                    44
                ],
                75: [
                    2,
                    44
                ],
                80: [
                    2,
                    44
                ],
                81: [
                    2,
                    44
                ],
                82: [
                    2,
                    44
                ],
                83: [
                    2,
                    44
                ],
                84: [
                    2,
                    44
                ],
                85: [
                    2,
                    44
                ],
                87: [
                    2,
                    44
                ]
            },
            {
                54: [
                    1,
                    109
                ]
            },
            {
                54: [
                    2,
                    83
                ],
                65: [
                    2,
                    83
                ],
                72: [
                    2,
                    83
                ],
                80: [
                    2,
                    83
                ],
                81: [
                    2,
                    83
                ],
                82: [
                    2,
                    83
                ],
                83: [
                    2,
                    83
                ],
                84: [
                    2,
                    83
                ],
                85: [
                    2,
                    83
                ]
            },
            {
                54: [
                    2,
                    85
                ]
            },
            {
                5: [
                    2,
                    13
                ],
                14: [
                    2,
                    13
                ],
                15: [
                    2,
                    13
                ],
                19: [
                    2,
                    13
                ],
                29: [
                    2,
                    13
                ],
                34: [
                    2,
                    13
                ],
                39: [
                    2,
                    13
                ],
                44: [
                    2,
                    13
                ],
                47: [
                    2,
                    13
                ],
                48: [
                    2,
                    13
                ],
                51: [
                    2,
                    13
                ],
                55: [
                    2,
                    13
                ],
                60: [
                    2,
                    13
                ]
            },
            {
                38: 55,
                39: [
                    1,
                    57
                ],
                43: 56,
                44: [
                    1,
                    58
                ],
                45: 111,
                46: 110,
                47: [
                    2,
                    76
                ]
            },
            {
                33: [
                    2,
                    70
                ],
                40: 112,
                65: [
                    2,
                    70
                ],
                72: [
                    2,
                    70
                ],
                75: [
                    2,
                    70
                ],
                80: [
                    2,
                    70
                ],
                81: [
                    2,
                    70
                ],
                82: [
                    2,
                    70
                ],
                83: [
                    2,
                    70
                ],
                84: [
                    2,
                    70
                ],
                85: [
                    2,
                    70
                ]
            },
            {
                47: [
                    2,
                    18
                ]
            },
            {
                5: [
                    2,
                    14
                ],
                14: [
                    2,
                    14
                ],
                15: [
                    2,
                    14
                ],
                19: [
                    2,
                    14
                ],
                29: [
                    2,
                    14
                ],
                34: [
                    2,
                    14
                ],
                39: [
                    2,
                    14
                ],
                44: [
                    2,
                    14
                ],
                47: [
                    2,
                    14
                ],
                48: [
                    2,
                    14
                ],
                51: [
                    2,
                    14
                ],
                55: [
                    2,
                    14
                ],
                60: [
                    2,
                    14
                ]
            },
            {
                33: [
                    1,
                    113
                ]
            },
            {
                33: [
                    2,
                    87
                ],
                65: [
                    2,
                    87
                ],
                72: [
                    2,
                    87
                ],
                80: [
                    2,
                    87
                ],
                81: [
                    2,
                    87
                ],
                82: [
                    2,
                    87
                ],
                83: [
                    2,
                    87
                ],
                84: [
                    2,
                    87
                ],
                85: [
                    2,
                    87
                ]
            },
            {
                33: [
                    2,
                    89
                ]
            },
            {
                20: 74,
                63: 115,
                64: 75,
                65: [
                    1,
                    43
                ],
                67: 114,
                68: [
                    2,
                    96
                ],
                69: 116,
                70: 76,
                71: 77,
                72: [
                    1,
                    78
                ],
                78: 26,
                79: 27,
                80: [
                    1,
                    28
                ],
                81: [
                    1,
                    29
                ],
                82: [
                    1,
                    30
                ],
                83: [
                    1,
                    31
                ],
                84: [
                    1,
                    32
                ],
                85: [
                    1,
                    34
                ],
                86: 33
            },
            {
                33: [
                    1,
                    117
                ]
            },
            {
                32: 118,
                33: [
                    2,
                    62
                ],
                74: 119,
                75: [
                    1,
                    120
                ]
            },
            {
                33: [
                    2,
                    59
                ],
                65: [
                    2,
                    59
                ],
                72: [
                    2,
                    59
                ],
                75: [
                    2,
                    59
                ],
                80: [
                    2,
                    59
                ],
                81: [
                    2,
                    59
                ],
                82: [
                    2,
                    59
                ],
                83: [
                    2,
                    59
                ],
                84: [
                    2,
                    59
                ],
                85: [
                    2,
                    59
                ]
            },
            {
                33: [
                    2,
                    61
                ],
                75: [
                    2,
                    61
                ]
            },
            {
                33: [
                    2,
                    68
                ],
                37: 121,
                74: 122,
                75: [
                    1,
                    120
                ]
            },
            {
                33: [
                    2,
                    65
                ],
                65: [
                    2,
                    65
                ],
                72: [
                    2,
                    65
                ],
                75: [
                    2,
                    65
                ],
                80: [
                    2,
                    65
                ],
                81: [
                    2,
                    65
                ],
                82: [
                    2,
                    65
                ],
                83: [
                    2,
                    65
                ],
                84: [
                    2,
                    65
                ],
                85: [
                    2,
                    65
                ]
            },
            {
                33: [
                    2,
                    67
                ],
                75: [
                    2,
                    67
                ]
            },
            {
                23: [
                    1,
                    123
                ]
            },
            {
                23: [
                    2,
                    51
                ],
                65: [
                    2,
                    51
                ],
                72: [
                    2,
                    51
                ],
                80: [
                    2,
                    51
                ],
                81: [
                    2,
                    51
                ],
                82: [
                    2,
                    51
                ],
                83: [
                    2,
                    51
                ],
                84: [
                    2,
                    51
                ],
                85: [
                    2,
                    51
                ]
            },
            {
                23: [
                    2,
                    53
                ]
            },
            {
                33: [
                    1,
                    124
                ]
            },
            {
                33: [
                    2,
                    91
                ],
                65: [
                    2,
                    91
                ],
                72: [
                    2,
                    91
                ],
                80: [
                    2,
                    91
                ],
                81: [
                    2,
                    91
                ],
                82: [
                    2,
                    91
                ],
                83: [
                    2,
                    91
                ],
                84: [
                    2,
                    91
                ],
                85: [
                    2,
                    91
                ]
            },
            {
                33: [
                    2,
                    93
                ]
            },
            {
                5: [
                    2,
                    22
                ],
                14: [
                    2,
                    22
                ],
                15: [
                    2,
                    22
                ],
                19: [
                    2,
                    22
                ],
                29: [
                    2,
                    22
                ],
                34: [
                    2,
                    22
                ],
                39: [
                    2,
                    22
                ],
                44: [
                    2,
                    22
                ],
                47: [
                    2,
                    22
                ],
                48: [
                    2,
                    22
                ],
                51: [
                    2,
                    22
                ],
                55: [
                    2,
                    22
                ],
                60: [
                    2,
                    22
                ]
            },
            {
                23: [
                    2,
                    99
                ],
                33: [
                    2,
                    99
                ],
                54: [
                    2,
                    99
                ],
                68: [
                    2,
                    99
                ],
                72: [
                    2,
                    99
                ],
                75: [
                    2,
                    99
                ]
            },
            {
                73: [
                    1,
                    108
                ]
            },
            {
                20: 74,
                63: 125,
                64: 75,
                65: [
                    1,
                    43
                ],
                72: [
                    1,
                    35
                ],
                78: 26,
                79: 27,
                80: [
                    1,
                    28
                ],
                81: [
                    1,
                    29
                ],
                82: [
                    1,
                    30
                ],
                83: [
                    1,
                    31
                ],
                84: [
                    1,
                    32
                ],
                85: [
                    1,
                    34
                ],
                86: 33
            },
            {
                5: [
                    2,
                    23
                ],
                14: [
                    2,
                    23
                ],
                15: [
                    2,
                    23
                ],
                19: [
                    2,
                    23
                ],
                29: [
                    2,
                    23
                ],
                34: [
                    2,
                    23
                ],
                39: [
                    2,
                    23
                ],
                44: [
                    2,
                    23
                ],
                47: [
                    2,
                    23
                ],
                48: [
                    2,
                    23
                ],
                51: [
                    2,
                    23
                ],
                55: [
                    2,
                    23
                ],
                60: [
                    2,
                    23
                ]
            },
            {
                47: [
                    2,
                    19
                ]
            },
            {
                47: [
                    2,
                    77
                ]
            },
            {
                20: 74,
                33: [
                    2,
                    72
                ],
                41: 126,
                63: 127,
                64: 75,
                65: [
                    1,
                    43
                ],
                69: 128,
                70: 76,
                71: 77,
                72: [
                    1,
                    78
                ],
                75: [
                    2,
                    72
                ],
                78: 26,
                79: 27,
                80: [
                    1,
                    28
                ],
                81: [
                    1,
                    29
                ],
                82: [
                    1,
                    30
                ],
                83: [
                    1,
                    31
                ],
                84: [
                    1,
                    32
                ],
                85: [
                    1,
                    34
                ],
                86: 33
            },
            {
                5: [
                    2,
                    24
                ],
                14: [
                    2,
                    24
                ],
                15: [
                    2,
                    24
                ],
                19: [
                    2,
                    24
                ],
                29: [
                    2,
                    24
                ],
                34: [
                    2,
                    24
                ],
                39: [
                    2,
                    24
                ],
                44: [
                    2,
                    24
                ],
                47: [
                    2,
                    24
                ],
                48: [
                    2,
                    24
                ],
                51: [
                    2,
                    24
                ],
                55: [
                    2,
                    24
                ],
                60: [
                    2,
                    24
                ]
            },
            {
                68: [
                    1,
                    129
                ]
            },
            {
                65: [
                    2,
                    95
                ],
                68: [
                    2,
                    95
                ],
                72: [
                    2,
                    95
                ],
                80: [
                    2,
                    95
                ],
                81: [
                    2,
                    95
                ],
                82: [
                    2,
                    95
                ],
                83: [
                    2,
                    95
                ],
                84: [
                    2,
                    95
                ],
                85: [
                    2,
                    95
                ]
            },
            {
                68: [
                    2,
                    97
                ]
            },
            {
                5: [
                    2,
                    21
                ],
                14: [
                    2,
                    21
                ],
                15: [
                    2,
                    21
                ],
                19: [
                    2,
                    21
                ],
                29: [
                    2,
                    21
                ],
                34: [
                    2,
                    21
                ],
                39: [
                    2,
                    21
                ],
                44: [
                    2,
                    21
                ],
                47: [
                    2,
                    21
                ],
                48: [
                    2,
                    21
                ],
                51: [
                    2,
                    21
                ],
                55: [
                    2,
                    21
                ],
                60: [
                    2,
                    21
                ]
            },
            {
                33: [
                    1,
                    130
                ]
            },
            {
                33: [
                    2,
                    63
                ]
            },
            {
                72: [
                    1,
                    132
                ],
                76: 131
            },
            {
                33: [
                    1,
                    133
                ]
            },
            {
                33: [
                    2,
                    69
                ]
            },
            {
                15: [
                    2,
                    12
                ],
                18: [
                    2,
                    12
                ]
            },
            {
                14: [
                    2,
                    26
                ],
                15: [
                    2,
                    26
                ],
                19: [
                    2,
                    26
                ],
                29: [
                    2,
                    26
                ],
                34: [
                    2,
                    26
                ],
                47: [
                    2,
                    26
                ],
                48: [
                    2,
                    26
                ],
                51: [
                    2,
                    26
                ],
                55: [
                    2,
                    26
                ],
                60: [
                    2,
                    26
                ]
            },
            {
                23: [
                    2,
                    31
                ],
                33: [
                    2,
                    31
                ],
                54: [
                    2,
                    31
                ],
                68: [
                    2,
                    31
                ],
                72: [
                    2,
                    31
                ],
                75: [
                    2,
                    31
                ]
            },
            {
                33: [
                    2,
                    74
                ],
                42: 134,
                74: 135,
                75: [
                    1,
                    120
                ]
            },
            {
                33: [
                    2,
                    71
                ],
                65: [
                    2,
                    71
                ],
                72: [
                    2,
                    71
                ],
                75: [
                    2,
                    71
                ],
                80: [
                    2,
                    71
                ],
                81: [
                    2,
                    71
                ],
                82: [
                    2,
                    71
                ],
                83: [
                    2,
                    71
                ],
                84: [
                    2,
                    71
                ],
                85: [
                    2,
                    71
                ]
            },
            {
                33: [
                    2,
                    73
                ],
                75: [
                    2,
                    73
                ]
            },
            {
                23: [
                    2,
                    29
                ],
                33: [
                    2,
                    29
                ],
                54: [
                    2,
                    29
                ],
                65: [
                    2,
                    29
                ],
                68: [
                    2,
                    29
                ],
                72: [
                    2,
                    29
                ],
                75: [
                    2,
                    29
                ],
                80: [
                    2,
                    29
                ],
                81: [
                    2,
                    29
                ],
                82: [
                    2,
                    29
                ],
                83: [
                    2,
                    29
                ],
                84: [
                    2,
                    29
                ],
                85: [
                    2,
                    29
                ]
            },
            {
                14: [
                    2,
                    15
                ],
                15: [
                    2,
                    15
                ],
                19: [
                    2,
                    15
                ],
                29: [
                    2,
                    15
                ],
                34: [
                    2,
                    15
                ],
                39: [
                    2,
                    15
                ],
                44: [
                    2,
                    15
                ],
                47: [
                    2,
                    15
                ],
                48: [
                    2,
                    15
                ],
                51: [
                    2,
                    15
                ],
                55: [
                    2,
                    15
                ],
                60: [
                    2,
                    15
                ]
            },
            {
                72: [
                    1,
                    137
                ],
                77: [
                    1,
                    136
                ]
            },
            {
                72: [
                    2,
                    100
                ],
                77: [
                    2,
                    100
                ]
            },
            {
                14: [
                    2,
                    16
                ],
                15: [
                    2,
                    16
                ],
                19: [
                    2,
                    16
                ],
                29: [
                    2,
                    16
                ],
                34: [
                    2,
                    16
                ],
                44: [
                    2,
                    16
                ],
                47: [
                    2,
                    16
                ],
                48: [
                    2,
                    16
                ],
                51: [
                    2,
                    16
                ],
                55: [
                    2,
                    16
                ],
                60: [
                    2,
                    16
                ]
            },
            {
                33: [
                    1,
                    138
                ]
            },
            {
                33: [
                    2,
                    75
                ]
            },
            {
                33: [
                    2,
                    32
                ]
            },
            {
                72: [
                    2,
                    101
                ],
                77: [
                    2,
                    101
                ]
            },
            {
                14: [
                    2,
                    17
                ],
                15: [
                    2,
                    17
                ],
                19: [
                    2,
                    17
                ],
                29: [
                    2,
                    17
                ],
                34: [
                    2,
                    17
                ],
                39: [
                    2,
                    17
                ],
                44: [
                    2,
                    17
                ],
                47: [
                    2,
                    17
                ],
                48: [
                    2,
                    17
                ],
                51: [
                    2,
                    17
                ],
                55: [
                    2,
                    17
                ],
                60: [
                    2,
                    17
                ]
            }
        ],
        defaultActions: {
            4: [
                2,
                1
            ],
            54: [
                2,
                55
            ],
            56: [
                2,
                20
            ],
            60: [
                2,
                57
            ],
            73: [
                2,
                81
            ],
            82: [
                2,
                85
            ],
            86: [
                2,
                18
            ],
            90: [
                2,
                89
            ],
            101: [
                2,
                53
            ],
            104: [
                2,
                93
            ],
            110: [
                2,
                19
            ],
            111: [
                2,
                77
            ],
            116: [
                2,
                97
            ],
            119: [
                2,
                63
            ],
            122: [
                2,
                69
            ],
            135: [
                2,
                75
            ],
            136: [
                2,
                32
            ]
        },
        parseError: function parseError(str, hash) {
            throw new Error(str);
        },
        parse: function parse(input) {
            var popStack = function popStack(n) {
                stack.length = stack.length - 2 * n;
                vstack.length = vstack.length - n;
                lstack.length = lstack.length - n;
            };
            var lex = function lex() {
                var token;
                token = self.lexer.lex() || 1;
                if (typeof token !== "number") token = self.symbols_[token] || token;
                return token;
            };
            var self = this, stack = [
                0
            ], vstack = [
                null
            ], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
            this.lexer.setInput(input);
            this.lexer.yy = this.yy;
            this.yy.lexer = this.lexer;
            this.yy.parser = this;
            if (typeof this.lexer.yylloc == "undefined") this.lexer.yylloc = {};
            var yyloc = this.lexer.yylloc;
            lstack.push(yyloc);
            var ranges = this.lexer.options && this.lexer.options.ranges;
            if (typeof this.yy.parseError === "function") this.parseError = this.yy.parseError;
            var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
            while(true){
                state = stack[stack.length - 1];
                if (this.defaultActions[state]) action = this.defaultActions[state];
                else {
                    if (symbol === null || typeof symbol == "undefined") symbol = lex();
                    action = table[state] && table[state][symbol];
                }
                if (typeof action === "undefined" || !action.length || !action[0]) {
                    var errStr = "";
                    if (!recovering) {
                        expected = [];
                        for(p in table[state])if (this.terminals_[p] && p > 2) expected.push("'" + this.terminals_[p] + "'");
                        if (this.lexer.showPosition) errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                        else errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
                        this.parseError(errStr, {
                            text: this.lexer.match,
                            token: this.terminals_[symbol] || symbol,
                            line: this.lexer.yylineno,
                            loc: yyloc,
                            expected: expected
                        });
                    }
                }
                if (action[0] instanceof Array && action.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
                switch(action[0]){
                    case 1:
                        stack.push(symbol);
                        vstack.push(this.lexer.yytext);
                        lstack.push(this.lexer.yylloc);
                        stack.push(action[1]);
                        symbol = null;
                        if (!preErrorSymbol) {
                            yyleng = this.lexer.yyleng;
                            yytext = this.lexer.yytext;
                            yylineno = this.lexer.yylineno;
                            yyloc = this.lexer.yylloc;
                            if (recovering > 0) recovering--;
                        } else {
                            symbol = preErrorSymbol;
                            preErrorSymbol = null;
                        }
                        break;
                    case 2:
                        len = this.productions_[action[1]][1];
                        yyval.$ = vstack[vstack.length - len];
                        yyval._$ = {
                            first_line: lstack[lstack.length - (len || 1)].first_line,
                            last_line: lstack[lstack.length - 1].last_line,
                            first_column: lstack[lstack.length - (len || 1)].first_column,
                            last_column: lstack[lstack.length - 1].last_column
                        };
                        if (ranges) yyval._$.range = [
                            lstack[lstack.length - (len || 1)].range[0],
                            lstack[lstack.length - 1].range[1]
                        ];
                        r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
                        if (typeof r !== "undefined") return r;
                        if (len) {
                            stack = stack.slice(0, -1 * len * 2);
                            vstack = vstack.slice(0, -1 * len);
                            lstack = lstack.slice(0, -1 * len);
                        }
                        stack.push(this.productions_[action[1]][0]);
                        vstack.push(yyval.$);
                        lstack.push(yyval._$);
                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                        stack.push(newState);
                        break;
                    case 3:
                        return true;
                }
            }
            return true;
        }
    };
    /* Jison generated lexer */ var lexer = function() {
        var lexer = {
            EOF: 1,
            parseError: function parseError(str, hash) {
                if (this.yy.parser) this.yy.parser.parseError(str, hash);
                else throw new Error(str);
            },
            setInput: function setInput(input) {
                this._input = input;
                this._more = this._less = this.done = false;
                this.yylineno = this.yyleng = 0;
                this.yytext = this.matched = this.match = "";
                this.conditionStack = [
                    "INITIAL"
                ];
                this.yylloc = {
                    first_line: 1,
                    first_column: 0,
                    last_line: 1,
                    last_column: 0
                };
                if (this.options.ranges) this.yylloc.range = [
                    0,
                    0
                ];
                this.offset = 0;
                return this;
            },
            input: function input() {
                var ch = this._input[0];
                this.yytext += ch;
                this.yyleng++;
                this.offset++;
                this.match += ch;
                this.matched += ch;
                var lines = ch.match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno++;
                    this.yylloc.last_line++;
                } else this.yylloc.last_column++;
                if (this.options.ranges) this.yylloc.range[1]++;
                this._input = this._input.slice(1);
                return ch;
            },
            unput: function unput(ch) {
                var len = ch.length;
                var lines = ch.split(/(?:\r\n?|\n)/g);
                this._input = ch + this._input;
                this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
                //this.yyleng -= len;
                this.offset -= len;
                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - 1);
                this.matched = this.matched.substr(0, this.matched.length - 1);
                if (lines.length - 1) this.yylineno -= lines.length - 1;
                var r = this.yylloc.range;
                this.yylloc = {
                    first_line: this.yylloc.first_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.first_column,
                    last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
                };
                if (this.options.ranges) this.yylloc.range = [
                    r[0],
                    r[0] + this.yyleng - len
                ];
                return this;
            },
            more: function more() {
                this._more = true;
                return this;
            },
            less: function less(n) {
                this.unput(this.match.slice(n));
            },
            pastInput: function pastInput() {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "");
            },
            upcomingInput: function upcomingInput() {
                var next = this.match;
                if (next.length < 20) next += this._input.substr(0, 20 - next.length);
                return (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "");
            },
            showPosition: function showPosition() {
                var pre = this.pastInput();
                var c = new Array(pre.length + 1).join("-");
                return pre + this.upcomingInput() + "\n" + c + "^";
            },
            next: function next() {
                if (this.done) return this.EOF;
                if (!this._input) this.done = true;
                var token, match, tempMatch, index, col, lines;
                if (!this._more) {
                    this.yytext = "";
                    this.match = "";
                }
                var rules = this._currentRules();
                for(var i = 0; i < rules.length; i++){
                    tempMatch = this._input.match(this.rules[rules[i]]);
                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                        match = tempMatch;
                        index = i;
                        if (!this.options.flex) break;
                    }
                }
                if (match) {
                    lines = match[0].match(/(?:\r\n?|\n).*/g);
                    if (lines) this.yylineno += lines.length;
                    this.yylloc = {
                        first_line: this.yylloc.last_line,
                        last_line: this.yylineno + 1,
                        first_column: this.yylloc.last_column,
                        last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
                    };
                    this.yytext += match[0];
                    this.match += match[0];
                    this.matches = match;
                    this.yyleng = this.yytext.length;
                    if (this.options.ranges) this.yylloc.range = [
                        this.offset,
                        this.offset += this.yyleng
                    ];
                    this._more = false;
                    this._input = this._input.slice(match[0].length);
                    this.matched += match[0];
                    token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
                    if (this.done && this._input) this.done = false;
                    if (token) return token;
                    else return;
                }
                if (this._input === "") return this.EOF;
                else return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                    text: "",
                    token: null,
                    line: this.yylineno
                });
            },
            lex: function lex() {
                var r = this.next();
                if (typeof r !== "undefined") return r;
                else return this.lex();
            },
            begin: function begin(condition) {
                this.conditionStack.push(condition);
            },
            popState: function popState() {
                return this.conditionStack.pop();
            },
            _currentRules: function _currentRules() {
                return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
            },
            topState: function topState() {
                return this.conditionStack[this.conditionStack.length - 2];
            },
            pushState: function begin(condition) {
                this.begin(condition);
            }
        };
        lexer.options = {};
        lexer.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
            var strip = function strip(start, end) {
                return yy_.yytext = yy_.yytext.substring(start, yy_.yyleng - end + start);
            };
            var YYSTATE = YY_START;
            switch($avoiding_name_collisions){
                case 0:
                    if (yy_.yytext.slice(-2) === "\\\\") {
                        strip(0, 1);
                        this.begin("mu");
                    } else if (yy_.yytext.slice(-1) === "\\") {
                        strip(0, 1);
                        this.begin("emu");
                    } else this.begin("mu");
                    if (yy_.yytext) return 15;
                    break;
                case 1:
                    return 15;
                case 2:
                    this.popState();
                    return 15;
                case 3:
                    this.begin("raw");
                    return 15;
                case 4:
                    this.popState();
                    // Should be using `this.topState()` below, but it currently
                    // returns the second top instead of the first top. Opened an
                    // issue about it at https://github.com/zaach/jison/issues/291
                    if (this.conditionStack[this.conditionStack.length - 1] === "raw") return 15;
                    else {
                        strip(5, 9);
                        return "END_RAW_BLOCK";
                    }
                    break;
                case 5:
                    return 15;
                case 6:
                    this.popState();
                    return 14;
                case 7:
                    return 65;
                case 8:
                    return 68;
                case 9:
                    return 19;
                case 10:
                    this.popState();
                    this.begin("raw");
                    return 23;
                case 11:
                    return 55;
                case 12:
                    return 60;
                case 13:
                    return 29;
                case 14:
                    return 47;
                case 15:
                    this.popState();
                    return 44;
                case 16:
                    this.popState();
                    return 44;
                case 17:
                    return 34;
                case 18:
                    return 39;
                case 19:
                    return 51;
                case 20:
                    return 48;
                case 21:
                    this.unput(yy_.yytext);
                    this.popState();
                    this.begin("com");
                    break;
                case 22:
                    this.popState();
                    return 14;
                case 23:
                    return 48;
                case 24:
                    return 73;
                case 25:
                    return 72;
                case 26:
                    return 72;
                case 27:
                    return 87;
                case 28:
                    break;
                case 29:
                    this.popState();
                    return 54;
                case 30:
                    this.popState();
                    return 33;
                case 31:
                    yy_.yytext = strip(1, 2).replace(/\\"/g, '"');
                    return 80;
                case 32:
                    yy_.yytext = strip(1, 2).replace(/\\'/g, "'");
                    return 80;
                case 33:
                    return 85;
                case 34:
                    return 82;
                case 35:
                    return 82;
                case 36:
                    return 83;
                case 37:
                    return 84;
                case 38:
                    return 81;
                case 39:
                    return 75;
                case 40:
                    return 77;
                case 41:
                    return 72;
                case 42:
                    yy_.yytext = yy_.yytext.replace(/\\([\\\]])/g, "$1");
                    return 72;
                case 43:
                    return "INVALID";
                case 44:
                    return 5;
            }
        };
        lexer.rules = [
            /^(?:[^\x00]*?(?=(\{\{)))/,
            /^(?:[^\x00]+)/,
            /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,
            /^(?:\{\{\{\{(?=[^\/]))/,
            /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/,
            /^(?:[^\x00]+?(?=(\{\{\{\{)))/,
            /^(?:[\s\S]*?--(~)?\}\})/,
            /^(?:\()/,
            /^(?:\))/,
            /^(?:\{\{\{\{)/,
            /^(?:\}\}\}\})/,
            /^(?:\{\{(~)?>)/,
            /^(?:\{\{(~)?#>)/,
            /^(?:\{\{(~)?#\*?)/,
            /^(?:\{\{(~)?\/)/,
            /^(?:\{\{(~)?\^\s*(~)?\}\})/,
            /^(?:\{\{(~)?\s*else\s*(~)?\}\})/,
            /^(?:\{\{(~)?\^)/,
            /^(?:\{\{(~)?\s*else\b)/,
            /^(?:\{\{(~)?\{)/,
            /^(?:\{\{(~)?&)/,
            /^(?:\{\{(~)?!--)/,
            /^(?:\{\{(~)?![\s\S]*?\}\})/,
            /^(?:\{\{(~)?\*?)/,
            /^(?:=)/,
            /^(?:\.\.)/,
            /^(?:\.(?=([=~}\s\/.)|])))/,
            /^(?:[\/.])/,
            /^(?:\s+)/,
            /^(?:\}(~)?\}\})/,
            /^(?:(~)?\}\})/,
            /^(?:"(\\["]|[^"])*")/,
            /^(?:'(\\[']|[^'])*')/,
            /^(?:@)/,
            /^(?:true(?=([~}\s)])))/,
            /^(?:false(?=([~}\s)])))/,
            /^(?:undefined(?=([~}\s)])))/,
            /^(?:null(?=([~}\s)])))/,
            /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/,
            /^(?:as\s+\|)/,
            /^(?:\|)/,
            /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/,
            /^(?:\[(\\\]|[^\]])*\])/,
            /^(?:.)/,
            /^(?:$)/
        ];
        lexer.conditions = {
            mu: {
                rules: [
                    7,
                    8,
                    9,
                    10,
                    11,
                    12,
                    13,
                    14,
                    15,
                    16,
                    17,
                    18,
                    19,
                    20,
                    21,
                    22,
                    23,
                    24,
                    25,
                    26,
                    27,
                    28,
                    29,
                    30,
                    31,
                    32,
                    33,
                    34,
                    35,
                    36,
                    37,
                    38,
                    39,
                    40,
                    41,
                    42,
                    43,
                    44
                ],
                inclusive: false
            },
            emu: {
                rules: [
                    2
                ],
                inclusive: false
            },
            com: {
                rules: [
                    6
                ],
                inclusive: false
            },
            raw: {
                rules: [
                    3,
                    4,
                    5
                ],
                inclusive: false
            },
            INITIAL: {
                rules: [
                    0,
                    1,
                    44
                ],
                inclusive: true
            }
        };
        return lexer;
    }();
    parser.lexer = lexer;
    Parser.prototype = parser;
    parser.Parser = Parser;
    return new Parser();
}();
$b26687f1a7a330ce$exports["default"] = $b26687f1a7a330ce$var$handlebars;
$b26687f1a7a330ce$exports = $b26687f1a7a330ce$exports["default"];


var $9eaa0297a6df13c2$var$_parser2 = $9eaa0297a6df13c2$var$_interopRequireDefault($b26687f1a7a330ce$exports);
var $ef77bd07506ec299$exports = {};
"use strict";
$ef77bd07506ec299$exports.__esModule = true;
// istanbul ignore next
function $ef77bd07506ec299$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
var $9e02a88a4e2c4dd9$exports = {};
"use strict";
$9e02a88a4e2c4dd9$exports.__esModule = true;
// istanbul ignore next
function $9e02a88a4e2c4dd9$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}

var $9e02a88a4e2c4dd9$var$_exception2 = $9e02a88a4e2c4dd9$var$_interopRequireDefault($95a51684e2818842$exports);
function $9e02a88a4e2c4dd9$var$Visitor() {
    this.parents = [];
}
$9e02a88a4e2c4dd9$var$Visitor.prototype = {
    constructor: $9e02a88a4e2c4dd9$var$Visitor,
    mutating: false,
    // Visits a given value. If mutating, will replace the value if necessary.
    acceptKey: function acceptKey(node, name) {
        var value = this.accept(node[name]);
        if (this.mutating) {
            // Hacky sanity check: This may have a few false positives for type for the helper
            // methods but will generally do the right thing without a lot of overhead.
            if (value && !$9e02a88a4e2c4dd9$var$Visitor.prototype[value.type]) throw new $9e02a88a4e2c4dd9$var$_exception2["default"]('Unexpected node type "' + value.type + '" found when accepting ' + name + " on " + node.type);
            node[name] = value;
        }
    },
    // Performs an accept operation with added sanity check to ensure
    // required keys are not removed.
    acceptRequired: function acceptRequired(node, name) {
        this.acceptKey(node, name);
        if (!node[name]) throw new $9e02a88a4e2c4dd9$var$_exception2["default"](node.type + " requires " + name);
    },
    // Traverses a given array. If mutating, empty respnses will be removed
    // for child elements.
    acceptArray: function acceptArray(array) {
        for(var i = 0, l = array.length; i < l; i++){
            this.acceptKey(array, i);
            if (!array[i]) {
                array.splice(i, 1);
                i--;
                l--;
            }
        }
    },
    accept: function accept(object) {
        if (!object) return;
        /* istanbul ignore next: Sanity code */ if (!this[object.type]) throw new $9e02a88a4e2c4dd9$var$_exception2["default"]("Unknown type: " + object.type, object);
        if (this.current) this.parents.unshift(this.current);
        this.current = object;
        var ret = this[object.type](object);
        this.current = this.parents.shift();
        if (!this.mutating || ret) return ret;
        else if (ret !== false) return object;
    },
    Program: function Program(program) {
        this.acceptArray(program.body);
    },
    MustacheStatement: $9e02a88a4e2c4dd9$var$visitSubExpression,
    Decorator: $9e02a88a4e2c4dd9$var$visitSubExpression,
    BlockStatement: $9e02a88a4e2c4dd9$var$visitBlock,
    DecoratorBlock: $9e02a88a4e2c4dd9$var$visitBlock,
    PartialStatement: $9e02a88a4e2c4dd9$var$visitPartial,
    PartialBlockStatement: function PartialBlockStatement(partial) {
        $9e02a88a4e2c4dd9$var$visitPartial.call(this, partial);
        this.acceptKey(partial, "program");
    },
    ContentStatement: function ContentStatement() /* content */ {},
    CommentStatement: function CommentStatement() /* comment */ {},
    SubExpression: $9e02a88a4e2c4dd9$var$visitSubExpression,
    PathExpression: function PathExpression() /* path */ {},
    StringLiteral: function StringLiteral() /* string */ {},
    NumberLiteral: function NumberLiteral() /* number */ {},
    BooleanLiteral: function BooleanLiteral() /* bool */ {},
    UndefinedLiteral: function UndefinedLiteral() /* literal */ {},
    NullLiteral: function NullLiteral() /* literal */ {},
    Hash: function Hash(hash) {
        this.acceptArray(hash.pairs);
    },
    HashPair: function HashPair(pair) {
        this.acceptRequired(pair, "value");
    }
};
function $9e02a88a4e2c4dd9$var$visitSubExpression(mustache) {
    this.acceptRequired(mustache, "path");
    this.acceptArray(mustache.params);
    this.acceptKey(mustache, "hash");
}
function $9e02a88a4e2c4dd9$var$visitBlock(block) {
    $9e02a88a4e2c4dd9$var$visitSubExpression.call(this, block);
    this.acceptKey(block, "program");
    this.acceptKey(block, "inverse");
}
function $9e02a88a4e2c4dd9$var$visitPartial(partial) {
    this.acceptRequired(partial, "name");
    this.acceptArray(partial.params);
    this.acceptKey(partial, "hash");
}
$9e02a88a4e2c4dd9$exports["default"] = $9e02a88a4e2c4dd9$var$Visitor;
$9e02a88a4e2c4dd9$exports = $9e02a88a4e2c4dd9$exports["default"];


var $ef77bd07506ec299$var$_visitor2 = $ef77bd07506ec299$var$_interopRequireDefault($9e02a88a4e2c4dd9$exports);
function $ef77bd07506ec299$var$WhitespaceControl() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    this.options = options;
}
$ef77bd07506ec299$var$WhitespaceControl.prototype = new $ef77bd07506ec299$var$_visitor2["default"]();
$ef77bd07506ec299$var$WhitespaceControl.prototype.Program = function(program) {
    var doStandalone = !this.options.ignoreStandalone;
    var isRoot = !this.isRootSeen;
    this.isRootSeen = true;
    var body = program.body;
    for(var i = 0, l = body.length; i < l; i++){
        var current = body[i], strip = this.accept(current);
        if (!strip) continue;
        var _isPrevWhitespace = $ef77bd07506ec299$var$isPrevWhitespace(body, i, isRoot), _isNextWhitespace = $ef77bd07506ec299$var$isNextWhitespace(body, i, isRoot), openStandalone = strip.openStandalone && _isPrevWhitespace, closeStandalone = strip.closeStandalone && _isNextWhitespace, inlineStandalone = strip.inlineStandalone && _isPrevWhitespace && _isNextWhitespace;
        if (strip.close) $ef77bd07506ec299$var$omitRight(body, i, true);
        if (strip.open) $ef77bd07506ec299$var$omitLeft(body, i, true);
        if (doStandalone && inlineStandalone) {
            $ef77bd07506ec299$var$omitRight(body, i);
            if ($ef77bd07506ec299$var$omitLeft(body, i)) // If we are on a standalone node, save the indent info for partials
            {
                if (current.type === "PartialStatement") // Pull out the whitespace from the final line
                current.indent = /([ \t]+$)/.exec(body[i - 1].original)[1];
            }
        }
        if (doStandalone && openStandalone) {
            $ef77bd07506ec299$var$omitRight((current.program || current.inverse).body);
            // Strip out the previous content node if it's whitespace only
            $ef77bd07506ec299$var$omitLeft(body, i);
        }
        if (doStandalone && closeStandalone) {
            // Always strip the next node
            $ef77bd07506ec299$var$omitRight(body, i);
            $ef77bd07506ec299$var$omitLeft((current.inverse || current.program).body);
        }
    }
    return program;
};
$ef77bd07506ec299$var$WhitespaceControl.prototype.BlockStatement = $ef77bd07506ec299$var$WhitespaceControl.prototype.DecoratorBlock = $ef77bd07506ec299$var$WhitespaceControl.prototype.PartialBlockStatement = function(block) {
    this.accept(block.program);
    this.accept(block.inverse);
    // Find the inverse program that is involed with whitespace stripping.
    var program = block.program || block.inverse, inverse = block.program && block.inverse, firstInverse = inverse, lastInverse = inverse;
    if (inverse && inverse.chained) {
        firstInverse = inverse.body[0].program;
        // Walk the inverse chain to find the last inverse that is actually in the chain.
        while(lastInverse.chained)lastInverse = lastInverse.body[lastInverse.body.length - 1].program;
    }
    var strip = {
        open: block.openStrip.open,
        close: block.closeStrip.close,
        // Determine the standalone candiacy. Basically flag our content as being possibly standalone
        // so our parent can determine if we actually are standalone
        openStandalone: $ef77bd07506ec299$var$isNextWhitespace(program.body),
        closeStandalone: $ef77bd07506ec299$var$isPrevWhitespace((firstInverse || program).body)
    };
    if (block.openStrip.close) $ef77bd07506ec299$var$omitRight(program.body, null, true);
    if (inverse) {
        var inverseStrip = block.inverseStrip;
        if (inverseStrip.open) $ef77bd07506ec299$var$omitLeft(program.body, null, true);
        if (inverseStrip.close) $ef77bd07506ec299$var$omitRight(firstInverse.body, null, true);
        if (block.closeStrip.open) $ef77bd07506ec299$var$omitLeft(lastInverse.body, null, true);
        // Find standalone else statments
        if (!this.options.ignoreStandalone && $ef77bd07506ec299$var$isPrevWhitespace(program.body) && $ef77bd07506ec299$var$isNextWhitespace(firstInverse.body)) {
            $ef77bd07506ec299$var$omitLeft(program.body);
            $ef77bd07506ec299$var$omitRight(firstInverse.body);
        }
    } else if (block.closeStrip.open) $ef77bd07506ec299$var$omitLeft(program.body, null, true);
    return strip;
};
$ef77bd07506ec299$var$WhitespaceControl.prototype.Decorator = $ef77bd07506ec299$var$WhitespaceControl.prototype.MustacheStatement = function(mustache) {
    return mustache.strip;
};
$ef77bd07506ec299$var$WhitespaceControl.prototype.PartialStatement = $ef77bd07506ec299$var$WhitespaceControl.prototype.CommentStatement = function(node) {
    /* istanbul ignore next */ var strip = node.strip || {};
    return {
        inlineStandalone: true,
        open: strip.open,
        close: strip.close
    };
};
function $ef77bd07506ec299$var$isPrevWhitespace(body, i, isRoot) {
    if (i === undefined) i = body.length;
    // Nodes that end with newlines are considered whitespace (but are special
    // cased for strip operations)
    var prev = body[i - 1], sibling = body[i - 2];
    if (!prev) return isRoot;
    if (prev.type === "ContentStatement") return (sibling || !isRoot ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(prev.original);
}
function $ef77bd07506ec299$var$isNextWhitespace(body, i, isRoot) {
    if (i === undefined) i = -1;
    var next = body[i + 1], sibling = body[i + 2];
    if (!next) return isRoot;
    if (next.type === "ContentStatement") return (sibling || !isRoot ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(next.original);
}
// Marks the node to the right of the position as omitted.
// I.e. {{foo}}' ' will mark the ' ' node as omitted.
//
// If i is undefined, then the first child will be marked as such.
//
// If mulitple is truthy then all whitespace will be stripped out until non-whitespace
// content is met.
function $ef77bd07506ec299$var$omitRight(body, i, multiple) {
    var current = body[i == null ? 0 : i + 1];
    if (!current || current.type !== "ContentStatement" || !multiple && current.rightStripped) return;
    var original = current.value;
    current.value = current.value.replace(multiple ? /^\s+/ : /^[ \t]*\r?\n?/, "");
    current.rightStripped = current.value !== original;
}
// Marks the node to the left of the position as omitted.
// I.e. ' '{{foo}} will mark the ' ' node as omitted.
//
// If i is undefined then the last child will be marked as such.
//
// If mulitple is truthy then all whitespace will be stripped out until non-whitespace
// content is met.
function $ef77bd07506ec299$var$omitLeft(body, i, multiple) {
    var current = body[i == null ? body.length - 1 : i - 1];
    if (!current || current.type !== "ContentStatement" || !multiple && current.leftStripped) return;
    // We omit the last node if it's whitespace only and not preceded by a non-content node.
    var original = current.value;
    current.value = current.value.replace(multiple ? /\s+$/ : /[ \t]+$/, "");
    current.leftStripped = current.value !== original;
    return current.leftStripped;
}
$ef77bd07506ec299$exports["default"] = $ef77bd07506ec299$var$WhitespaceControl;
$ef77bd07506ec299$exports = $ef77bd07506ec299$exports["default"];


var $9eaa0297a6df13c2$var$_whitespaceControl2 = $9eaa0297a6df13c2$var$_interopRequireDefault($ef77bd07506ec299$exports);
var $5e4fbb09872d7fcc$exports = {};

$parcel$export($5e4fbb09872d7fcc$exports, "__esModule", function () { return $5e4fbb09872d7fcc$export$1e511d4a378977f5; }, function (v) { return $5e4fbb09872d7fcc$export$1e511d4a378977f5 = v; });
$parcel$export($5e4fbb09872d7fcc$exports, "SourceLocation", function () { return $5e4fbb09872d7fcc$export$7387db7caf96fcdb; }, function (v) { return $5e4fbb09872d7fcc$export$7387db7caf96fcdb = v; });
$parcel$export($5e4fbb09872d7fcc$exports, "id", function () { return $5e4fbb09872d7fcc$export$d560c7e4a29451c2; }, function (v) { return $5e4fbb09872d7fcc$export$d560c7e4a29451c2 = v; });
$parcel$export($5e4fbb09872d7fcc$exports, "stripFlags", function () { return $5e4fbb09872d7fcc$export$a56883f706fd4153; }, function (v) { return $5e4fbb09872d7fcc$export$a56883f706fd4153 = v; });
$parcel$export($5e4fbb09872d7fcc$exports, "stripComment", function () { return $5e4fbb09872d7fcc$export$b0ad15fcf54729ff; }, function (v) { return $5e4fbb09872d7fcc$export$b0ad15fcf54729ff = v; });
$parcel$export($5e4fbb09872d7fcc$exports, "preparePath", function () { return $5e4fbb09872d7fcc$export$ea68d0dfa0ba072f; }, function (v) { return $5e4fbb09872d7fcc$export$ea68d0dfa0ba072f = v; });
$parcel$export($5e4fbb09872d7fcc$exports, "prepareMustache", function () { return $5e4fbb09872d7fcc$export$6b8089a1dfd22498; }, function (v) { return $5e4fbb09872d7fcc$export$6b8089a1dfd22498 = v; });
$parcel$export($5e4fbb09872d7fcc$exports, "prepareRawBlock", function () { return $5e4fbb09872d7fcc$export$c642052fcb02035b; }, function (v) { return $5e4fbb09872d7fcc$export$c642052fcb02035b = v; });
$parcel$export($5e4fbb09872d7fcc$exports, "prepareBlock", function () { return $5e4fbb09872d7fcc$export$9814855d713f4497; }, function (v) { return $5e4fbb09872d7fcc$export$9814855d713f4497 = v; });
$parcel$export($5e4fbb09872d7fcc$exports, "prepareProgram", function () { return $5e4fbb09872d7fcc$export$6e1c63ef90231a66; }, function (v) { return $5e4fbb09872d7fcc$export$6e1c63ef90231a66 = v; });
$parcel$export($5e4fbb09872d7fcc$exports, "preparePartialBlock", function () { return $5e4fbb09872d7fcc$export$8b47bc71272f067a; }, function (v) { return $5e4fbb09872d7fcc$export$8b47bc71272f067a = v; });
var $5e4fbb09872d7fcc$export$1e511d4a378977f5;
var $5e4fbb09872d7fcc$export$7387db7caf96fcdb;
var $5e4fbb09872d7fcc$export$d560c7e4a29451c2;
var $5e4fbb09872d7fcc$export$a56883f706fd4153;
var $5e4fbb09872d7fcc$export$b0ad15fcf54729ff;
var $5e4fbb09872d7fcc$export$ea68d0dfa0ba072f;
var $5e4fbb09872d7fcc$export$6b8089a1dfd22498;
var $5e4fbb09872d7fcc$export$c642052fcb02035b;
var $5e4fbb09872d7fcc$export$9814855d713f4497;
var $5e4fbb09872d7fcc$export$6e1c63ef90231a66;
var $5e4fbb09872d7fcc$export$8b47bc71272f067a;
"use strict";
$5e4fbb09872d7fcc$export$1e511d4a378977f5 = true;
$5e4fbb09872d7fcc$export$7387db7caf96fcdb = $5e4fbb09872d7fcc$var$SourceLocation;
$5e4fbb09872d7fcc$export$d560c7e4a29451c2 = $5e4fbb09872d7fcc$var$id;
$5e4fbb09872d7fcc$export$a56883f706fd4153 = $5e4fbb09872d7fcc$var$stripFlags;
$5e4fbb09872d7fcc$export$b0ad15fcf54729ff = $5e4fbb09872d7fcc$var$stripComment;
$5e4fbb09872d7fcc$export$ea68d0dfa0ba072f = $5e4fbb09872d7fcc$var$preparePath;
$5e4fbb09872d7fcc$export$6b8089a1dfd22498 = $5e4fbb09872d7fcc$var$prepareMustache;
$5e4fbb09872d7fcc$export$c642052fcb02035b = $5e4fbb09872d7fcc$var$prepareRawBlock;
$5e4fbb09872d7fcc$export$9814855d713f4497 = $5e4fbb09872d7fcc$var$prepareBlock;
$5e4fbb09872d7fcc$export$6e1c63ef90231a66 = $5e4fbb09872d7fcc$var$prepareProgram;
$5e4fbb09872d7fcc$export$8b47bc71272f067a = $5e4fbb09872d7fcc$var$preparePartialBlock;
// istanbul ignore next
function $5e4fbb09872d7fcc$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}

var $5e4fbb09872d7fcc$var$_exception2 = $5e4fbb09872d7fcc$var$_interopRequireDefault($95a51684e2818842$exports);
function $5e4fbb09872d7fcc$var$validateClose(open, close) {
    close = close.path ? close.path.original : close;
    if (open.path.original !== close) {
        var errorNode = {
            loc: open.path.loc
        };
        throw new $5e4fbb09872d7fcc$var$_exception2["default"](open.path.original + " doesn't match " + close, errorNode);
    }
}
function $5e4fbb09872d7fcc$var$SourceLocation(source, locInfo) {
    this.source = source;
    this.start = {
        line: locInfo.first_line,
        column: locInfo.first_column
    };
    this.end = {
        line: locInfo.last_line,
        column: locInfo.last_column
    };
}
function $5e4fbb09872d7fcc$var$id(token) {
    if (/^\[.*\]$/.test(token)) return token.substring(1, token.length - 1);
    else return token;
}
function $5e4fbb09872d7fcc$var$stripFlags(open, close) {
    return {
        open: open.charAt(2) === "~",
        close: close.charAt(close.length - 3) === "~"
    };
}
function $5e4fbb09872d7fcc$var$stripComment(comment) {
    return comment.replace(/^\{\{~?!-?-?/, "").replace(/-?-?~?\}\}$/, "");
}
function $5e4fbb09872d7fcc$var$preparePath(data, parts, loc) {
    loc = this.locInfo(loc);
    var original = data ? "@" : "", dig = [], depth = 0;
    for(var i = 0, l = parts.length; i < l; i++){
        var part = parts[i].part, // If we have [] syntax then we do not treat path references as operators,
        // i.e. foo.[this] resolves to approximately context.foo['this']
        isLiteral = parts[i].original !== part;
        original += (parts[i].separator || "") + part;
        if (!isLiteral && (part === ".." || part === "." || part === "this")) {
            if (dig.length > 0) throw new $5e4fbb09872d7fcc$var$_exception2["default"]("Invalid path: " + original, {
                loc: loc
            });
            else if (part === "..") depth++;
        } else dig.push(part);
    }
    return {
        type: "PathExpression",
        data: data,
        depth: depth,
        parts: dig,
        original: original,
        loc: loc
    };
}
function $5e4fbb09872d7fcc$var$prepareMustache(path, params, hash, open, strip, locInfo) {
    // Must use charAt to support IE pre-10
    var escapeFlag = open.charAt(3) || open.charAt(2), escaped = escapeFlag !== "{" && escapeFlag !== "&";
    var decorator = /\*/.test(open);
    return {
        type: decorator ? "Decorator" : "MustacheStatement",
        path: path,
        params: params,
        hash: hash,
        escaped: escaped,
        strip: strip,
        loc: this.locInfo(locInfo)
    };
}
function $5e4fbb09872d7fcc$var$prepareRawBlock(openRawBlock, contents, close, locInfo) {
    $5e4fbb09872d7fcc$var$validateClose(openRawBlock, close);
    locInfo = this.locInfo(locInfo);
    var program = {
        type: "Program",
        body: contents,
        strip: {},
        loc: locInfo
    };
    return {
        type: "BlockStatement",
        path: openRawBlock.path,
        params: openRawBlock.params,
        hash: openRawBlock.hash,
        program: program,
        openStrip: {},
        inverseStrip: {},
        closeStrip: {},
        loc: locInfo
    };
}
function $5e4fbb09872d7fcc$var$prepareBlock(openBlock, program, inverseAndProgram, close, inverted, locInfo) {
    if (close && close.path) $5e4fbb09872d7fcc$var$validateClose(openBlock, close);
    var decorator = /\*/.test(openBlock.open);
    program.blockParams = openBlock.blockParams;
    var inverse = undefined, inverseStrip = undefined;
    if (inverseAndProgram) {
        if (decorator) throw new $5e4fbb09872d7fcc$var$_exception2["default"]("Unexpected inverse block on decorator", inverseAndProgram);
        if (inverseAndProgram.chain) inverseAndProgram.program.body[0].closeStrip = close.strip;
        inverseStrip = inverseAndProgram.strip;
        inverse = inverseAndProgram.program;
    }
    if (inverted) {
        inverted = inverse;
        inverse = program;
        program = inverted;
    }
    return {
        type: decorator ? "DecoratorBlock" : "BlockStatement",
        path: openBlock.path,
        params: openBlock.params,
        hash: openBlock.hash,
        program: program,
        inverse: inverse,
        openStrip: openBlock.strip,
        inverseStrip: inverseStrip,
        closeStrip: close && close.strip,
        loc: this.locInfo(locInfo)
    };
}
function $5e4fbb09872d7fcc$var$prepareProgram(statements, loc) {
    if (!loc && statements.length) {
        var firstLoc = statements[0].loc, lastLoc = statements[statements.length - 1].loc;
        /* istanbul ignore else */ if (firstLoc && lastLoc) loc = {
            source: firstLoc.source,
            start: {
                line: firstLoc.start.line,
                column: firstLoc.start.column
            },
            end: {
                line: lastLoc.end.line,
                column: lastLoc.end.column
            }
        };
    }
    return {
        type: "Program",
        body: statements,
        strip: {},
        loc: loc
    };
}
function $5e4fbb09872d7fcc$var$preparePartialBlock(open, program, close, locInfo) {
    $5e4fbb09872d7fcc$var$validateClose(open, close);
    return {
        type: "PartialBlockStatement",
        name: open.path,
        params: open.params,
        hash: open.hash,
        program: program,
        openStrip: open.strip,
        closeStrip: close && close.strip,
        loc: this.locInfo(locInfo)
    };
}


var $9eaa0297a6df13c2$var$Helpers = $9eaa0297a6df13c2$var$_interopRequireWildcard($5e4fbb09872d7fcc$exports);

$9eaa0297a6df13c2$export$8f49e4af10703ce3 = $9eaa0297a6df13c2$var$_parser2["default"];
var $9eaa0297a6df13c2$var$yy = {};
$56c405a178dd13ac$export$8b58be045bf06082($9eaa0297a6df13c2$var$yy, $9eaa0297a6df13c2$var$Helpers);
function $9eaa0297a6df13c2$var$parseWithoutProcessing(input, options) {
    // Just return if an already-compiled AST was passed in.
    if (input.type === "Program") return input;
    $9eaa0297a6df13c2$var$_parser2["default"].yy = $9eaa0297a6df13c2$var$yy;
    // Altering the shared object here, but this is ok as parser is a sync operation
    $9eaa0297a6df13c2$var$yy.locInfo = function(locInfo) {
        return new $9eaa0297a6df13c2$var$yy.SourceLocation(options && options.srcName, locInfo);
    };
    var ast = $9eaa0297a6df13c2$var$_parser2["default"].parse(input);
    return ast;
}
function $9eaa0297a6df13c2$var$parse(input, options) {
    var ast = $9eaa0297a6df13c2$var$parseWithoutProcessing(input, options);
    var strip = new $9eaa0297a6df13c2$var$_whitespaceControl2["default"](options);
    return strip.accept(ast);
}


var $154968517acd1d98$export$1e511d4a378977f5;
var $154968517acd1d98$export$3a6335acfcf707c9;
var $154968517acd1d98$export$cfb9e0f1330f9bbd;
var $154968517acd1d98$export$ef7acd7185315e22;
/* eslint-disable new-cap */ "use strict";
$154968517acd1d98$export$1e511d4a378977f5 = true;
$154968517acd1d98$export$3a6335acfcf707c9 = $154968517acd1d98$var$Compiler;
$154968517acd1d98$export$cfb9e0f1330f9bbd = $154968517acd1d98$var$precompile;
$154968517acd1d98$export$ef7acd7185315e22 = $154968517acd1d98$var$compile;
// istanbul ignore next
function $154968517acd1d98$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}

var $154968517acd1d98$var$_exception2 = $154968517acd1d98$var$_interopRequireDefault($95a51684e2818842$exports);


var $154968517acd1d98$var$_ast2 = $154968517acd1d98$var$_interopRequireDefault($8a06cdb0c3679840$exports);
var $154968517acd1d98$var$slice = [].slice;
function $154968517acd1d98$var$Compiler() {}
// the foundHelper register will disambiguate helper lookup from finding a
// function in a context. This is necessary for mustache compatibility, which
// requires that context functions in blocks are evaluated by blockHelperMissing,
// and then proceed as if the resulting value was provided to blockHelperMissing.
$154968517acd1d98$var$Compiler.prototype = {
    compiler: $154968517acd1d98$var$Compiler,
    equals: function equals(other) {
        var len = this.opcodes.length;
        if (other.opcodes.length !== len) return false;
        for(var i = 0; i < len; i++){
            var opcode = this.opcodes[i], otherOpcode = other.opcodes[i];
            if (opcode.opcode !== otherOpcode.opcode || !$154968517acd1d98$var$argEquals(opcode.args, otherOpcode.args)) return false;
        }
        // We know that length is the same between the two arrays because they are directly tied
        // to the opcode behavior above.
        len = this.children.length;
        for(var i = 0; i < len; i++){
            if (!this.children[i].equals(other.children[i])) return false;
        }
        return true;
    },
    guid: 0,
    compile: function compile(program, options) {
        this.sourceNode = [];
        this.opcodes = [];
        this.children = [];
        this.options = options;
        this.stringParams = options.stringParams;
        this.trackIds = options.trackIds;
        options.blockParams = options.blockParams || [];
        options.knownHelpers = $56c405a178dd13ac$export$8b58be045bf06082(Object.create(null), {
            helperMissing: true,
            blockHelperMissing: true,
            each: true,
            "if": true,
            unless: true,
            "with": true,
            log: true,
            lookup: true
        }, options.knownHelpers);
        return this.accept(program);
    },
    compileProgram: function compileProgram(program) {
        var childCompiler = new this.compiler(), // eslint-disable-line new-cap
        result = childCompiler.compile(program, this.options), guid = this.guid++;
        this.usePartial = this.usePartial || result.usePartial;
        this.children[guid] = result;
        this.useDepths = this.useDepths || result.useDepths;
        return guid;
    },
    accept: function accept(node) {
        /* istanbul ignore next: Sanity code */ if (!this[node.type]) throw new $154968517acd1d98$var$_exception2["default"]("Unknown type: " + node.type, node);
        this.sourceNode.unshift(node);
        var ret = this[node.type](node);
        this.sourceNode.shift();
        return ret;
    },
    Program: function Program(program) {
        this.options.blockParams.unshift(program.blockParams);
        var body = program.body, bodyLength = body.length;
        for(var i = 0; i < bodyLength; i++)this.accept(body[i]);
        this.options.blockParams.shift();
        this.isSimple = bodyLength === 1;
        this.blockParams = program.blockParams ? program.blockParams.length : 0;
        return this;
    },
    BlockStatement: function BlockStatement(block) {
        $154968517acd1d98$var$transformLiteralToPath(block);
        var program = block.program, inverse = block.inverse;
        program = program && this.compileProgram(program);
        inverse = inverse && this.compileProgram(inverse);
        var type = this.classifySexpr(block);
        if (type === "helper") this.helperSexpr(block, program, inverse);
        else if (type === "simple") {
            this.simpleSexpr(block);
            // now that the simple mustache is resolved, we need to
            // evaluate it by executing `blockHelperMissing`
            this.opcode("pushProgram", program);
            this.opcode("pushProgram", inverse);
            this.opcode("emptyHash");
            this.opcode("blockValue", block.path.original);
        } else {
            this.ambiguousSexpr(block, program, inverse);
            // now that the simple mustache is resolved, we need to
            // evaluate it by executing `blockHelperMissing`
            this.opcode("pushProgram", program);
            this.opcode("pushProgram", inverse);
            this.opcode("emptyHash");
            this.opcode("ambiguousBlockValue");
        }
        this.opcode("append");
    },
    DecoratorBlock: function DecoratorBlock(decorator) {
        var program = decorator.program && this.compileProgram(decorator.program);
        var params = this.setupFullMustacheParams(decorator, program, undefined), path = decorator.path;
        this.useDecorators = true;
        this.opcode("registerDecorator", params.length, path.original);
    },
    PartialStatement: function PartialStatement(partial) {
        this.usePartial = true;
        var program = partial.program;
        if (program) program = this.compileProgram(partial.program);
        var params = partial.params;
        if (params.length > 1) throw new $154968517acd1d98$var$_exception2["default"]("Unsupported number of partial arguments: " + params.length, partial);
        else if (!params.length) {
            if (this.options.explicitPartialContext) this.opcode("pushLiteral", "undefined");
            else params.push({
                type: "PathExpression",
                parts: [],
                depth: 0
            });
        }
        var partialName = partial.name.original, isDynamic = partial.name.type === "SubExpression";
        if (isDynamic) this.accept(partial.name);
        this.setupFullMustacheParams(partial, program, undefined, true);
        var indent = partial.indent || "";
        if (this.options.preventIndent && indent) {
            this.opcode("appendContent", indent);
            indent = "";
        }
        this.opcode("invokePartial", isDynamic, partialName, indent);
        this.opcode("append");
    },
    PartialBlockStatement: function PartialBlockStatement(partialBlock) {
        this.PartialStatement(partialBlock);
    },
    MustacheStatement: function MustacheStatement(mustache) {
        this.SubExpression(mustache);
        if (mustache.escaped && !this.options.noEscape) this.opcode("appendEscaped");
        else this.opcode("append");
    },
    Decorator: function Decorator(decorator) {
        this.DecoratorBlock(decorator);
    },
    ContentStatement: function ContentStatement(content) {
        if (content.value) this.opcode("appendContent", content.value);
    },
    CommentStatement: function CommentStatement() {},
    SubExpression: function SubExpression(sexpr) {
        $154968517acd1d98$var$transformLiteralToPath(sexpr);
        var type = this.classifySexpr(sexpr);
        if (type === "simple") this.simpleSexpr(sexpr);
        else if (type === "helper") this.helperSexpr(sexpr);
        else this.ambiguousSexpr(sexpr);
    },
    ambiguousSexpr: function ambiguousSexpr(sexpr, program, inverse) {
        var path = sexpr.path, name = path.parts[0], isBlock = program != null || inverse != null;
        this.opcode("getContext", path.depth);
        this.opcode("pushProgram", program);
        this.opcode("pushProgram", inverse);
        path.strict = true;
        this.accept(path);
        this.opcode("invokeAmbiguous", name, isBlock);
    },
    simpleSexpr: function simpleSexpr(sexpr) {
        var path = sexpr.path;
        path.strict = true;
        this.accept(path);
        this.opcode("resolvePossibleLambda");
    },
    helperSexpr: function helperSexpr(sexpr, program, inverse) {
        var params = this.setupFullMustacheParams(sexpr, program, inverse), path = sexpr.path, name = path.parts[0];
        if (this.options.knownHelpers[name]) this.opcode("invokeKnownHelper", params.length, name);
        else if (this.options.knownHelpersOnly) throw new $154968517acd1d98$var$_exception2["default"]("You specified knownHelpersOnly, but used the unknown helper " + name, sexpr);
        else {
            path.strict = true;
            path.falsy = true;
            this.accept(path);
            this.opcode("invokeHelper", params.length, path.original, $154968517acd1d98$var$_ast2["default"].helpers.simpleId(path));
        }
    },
    PathExpression: function PathExpression(path) {
        this.addDepth(path.depth);
        this.opcode("getContext", path.depth);
        var name = path.parts[0], scoped = $154968517acd1d98$var$_ast2["default"].helpers.scopedId(path), blockParamId = !path.depth && !scoped && this.blockParamIndex(name);
        if (blockParamId) this.opcode("lookupBlockParam", blockParamId, path.parts);
        else if (!name) // Context reference, i.e. `{{foo .}}` or `{{foo ..}}`
        this.opcode("pushContext");
        else if (path.data) {
            this.options.data = true;
            this.opcode("lookupData", path.depth, path.parts, path.strict);
        } else this.opcode("lookupOnContext", path.parts, path.falsy, path.strict, scoped);
    },
    StringLiteral: function StringLiteral(string) {
        this.opcode("pushString", string.value);
    },
    NumberLiteral: function NumberLiteral(number) {
        this.opcode("pushLiteral", number.value);
    },
    BooleanLiteral: function BooleanLiteral(bool) {
        this.opcode("pushLiteral", bool.value);
    },
    UndefinedLiteral: function UndefinedLiteral() {
        this.opcode("pushLiteral", "undefined");
    },
    NullLiteral: function NullLiteral() {
        this.opcode("pushLiteral", "null");
    },
    Hash: function Hash(hash) {
        var pairs = hash.pairs, i = 0, l = pairs.length;
        this.opcode("pushHash");
        for(; i < l; i++)this.pushParam(pairs[i].value);
        while(i--)this.opcode("assignToHash", pairs[i].key);
        this.opcode("popHash");
    },
    // HELPERS
    opcode: function opcode(name) {
        this.opcodes.push({
            opcode: name,
            args: $154968517acd1d98$var$slice.call(arguments, 1),
            loc: this.sourceNode[0].loc
        });
    },
    addDepth: function addDepth(depth) {
        if (!depth) return;
        this.useDepths = true;
    },
    classifySexpr: function classifySexpr(sexpr) {
        var isSimple = $154968517acd1d98$var$_ast2["default"].helpers.simpleId(sexpr.path);
        var isBlockParam = isSimple && !!this.blockParamIndex(sexpr.path.parts[0]);
        // a mustache is an eligible helper if:
        // * its id is simple (a single part, not `this` or `..`)
        var isHelper = !isBlockParam && $154968517acd1d98$var$_ast2["default"].helpers.helperExpression(sexpr);
        // if a mustache is an eligible helper but not a definite
        // helper, it is ambiguous, and will be resolved in a later
        // pass or at runtime.
        var isEligible = !isBlockParam && (isHelper || isSimple);
        // if ambiguous, we can possibly resolve the ambiguity now
        // An eligible helper is one that does not have a complex path, i.e. `this.foo`, `../foo` etc.
        if (isEligible && !isHelper) {
            var _name = sexpr.path.parts[0], options = this.options;
            if (options.knownHelpers[_name]) isHelper = true;
            else if (options.knownHelpersOnly) isEligible = false;
        }
        if (isHelper) return "helper";
        else if (isEligible) return "ambiguous";
        else return "simple";
    },
    pushParams: function pushParams(params) {
        for(var i = 0, l = params.length; i < l; i++)this.pushParam(params[i]);
    },
    pushParam: function pushParam(val) {
        var value = val.value != null ? val.value : val.original || "";
        if (this.stringParams) {
            if (value.replace) value = value.replace(/^(\.?\.\/)*/g, "").replace(/\//g, ".");
            if (val.depth) this.addDepth(val.depth);
            this.opcode("getContext", val.depth || 0);
            this.opcode("pushStringParam", value, val.type);
            if (val.type === "SubExpression") // SubExpressions get evaluated and passed in
            // in string params mode.
            this.accept(val);
        } else {
            if (this.trackIds) {
                var blockParamIndex = undefined;
                if (val.parts && !$154968517acd1d98$var$_ast2["default"].helpers.scopedId(val) && !val.depth) blockParamIndex = this.blockParamIndex(val.parts[0]);
                if (blockParamIndex) {
                    var blockParamChild = val.parts.slice(1).join(".");
                    this.opcode("pushId", "BlockParam", blockParamIndex, blockParamChild);
                } else {
                    value = val.original || value;
                    if (value.replace) value = value.replace(/^this(?:\.|$)/, "").replace(/^\.\//, "").replace(/^\.$/, "");
                    this.opcode("pushId", val.type, value);
                }
            }
            this.accept(val);
        }
    },
    setupFullMustacheParams: function setupFullMustacheParams(sexpr, program, inverse, omitEmpty) {
        var params = sexpr.params;
        this.pushParams(params);
        this.opcode("pushProgram", program);
        this.opcode("pushProgram", inverse);
        if (sexpr.hash) this.accept(sexpr.hash);
        else this.opcode("emptyHash", omitEmpty);
        return params;
    },
    blockParamIndex: function blockParamIndex(name) {
        for(var depth = 0, len = this.options.blockParams.length; depth < len; depth++){
            var blockParams = this.options.blockParams[depth], param = blockParams && $56c405a178dd13ac$export$305f7d4e9d4624f2(blockParams, name);
            if (blockParams && param >= 0) return [
                depth,
                param
            ];
        }
    }
};
function $154968517acd1d98$var$precompile(input, options, env) {
    if (input == null || typeof input !== "string" && input.type !== "Program") throw new $154968517acd1d98$var$_exception2["default"]("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + input);
    options = options || {};
    if (!("data" in options)) options.data = true;
    if (options.compat) options.useDepths = true;
    var ast = env.parse(input, options), environment = new env.Compiler().compile(ast, options);
    return new env.JavaScriptCompiler().compile(environment, options);
}
function $154968517acd1d98$var$compile(input, options, env) {
    var compileInput = function compileInput() {
        var ast = env.parse(input, options), environment = new env.Compiler().compile(ast, options), templateSpec = new env.JavaScriptCompiler().compile(environment, options, undefined, true);
        return env.template(templateSpec);
    };
    var ret = // Template is only compiled on first use and cached after that point.
    function ret(context, execOptions) {
        if (!compiled) compiled = compileInput();
        return compiled.call(this, context, execOptions);
    };
    if (options === undefined) options = {};
    if (input == null || typeof input !== "string" && input.type !== "Program") throw new $154968517acd1d98$var$_exception2["default"]("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + input);
    options = $56c405a178dd13ac$export$8b58be045bf06082({}, options);
    if (!("data" in options)) options.data = true;
    if (options.compat) options.useDepths = true;
    var compiled = undefined;
    ret._setup = function(setupOptions) {
        if (!compiled) compiled = compileInput();
        return compiled._setup(setupOptions);
    };
    ret._child = function(i, data, blockParams, depths) {
        if (!compiled) compiled = compileInput();
        return compiled._child(i, data, blockParams, depths);
    };
    return ret;
}
function $154968517acd1d98$var$argEquals(a, b) {
    if (a === b) return true;
    if ($56c405a178dd13ac$export$43bee75e5e14138e(a) && $56c405a178dd13ac$export$43bee75e5e14138e(b) && a.length === b.length) {
        for(var i = 0; i < a.length; i++){
            if (!$154968517acd1d98$var$argEquals(a[i], b[i])) return false;
        }
        return true;
    }
}
function $154968517acd1d98$var$transformLiteralToPath(sexpr) {
    if (!sexpr.path.parts) {
        var literal = sexpr.path;
        // Casting to string here to make false and 0 literal values play nicely with the rest
        // of the system.
        sexpr.path = {
            type: "PathExpression",
            data: false,
            depth: 0,
            parts: [
                literal.original + ""
            ],
            original: literal.original + "",
            loc: literal.loc
        };
    }
}


var $3f75992ad0df6735$exports = {};
"use strict";
$3f75992ad0df6735$exports.__esModule = true;
// istanbul ignore next
function $3f75992ad0df6735$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}


var $3f75992ad0df6735$var$_exception2 = $3f75992ad0df6735$var$_interopRequireDefault($95a51684e2818842$exports);

var $08dc348e502451cc$exports = {};
/* global define */ "use strict";
$08dc348e502451cc$exports.__esModule = true;

var $08dc348e502451cc$var$SourceNode = undefined;

try {
    /* istanbul ignore next */ if (typeof define !== "function" || !define.amd) {
        // We don't support this in AMD environments. For these environments, we asusme that
        // they are running on the browser and thus have no need for the source-map library.
        var $08dc348e502451cc$var$SourceMap = (parcelRequire("jDFBk"));
        $08dc348e502451cc$var$SourceNode = $08dc348e502451cc$var$SourceMap.SourceNode;
    }
} catch (err) {}
/* NOP */ /* istanbul ignore if: tested but not covered in istanbul due to dist build  */ if (!$08dc348e502451cc$var$SourceNode) {
    $08dc348e502451cc$var$SourceNode = function SourceNode(line, column, srcFile, chunks) {
        this.src = "";
        if (chunks) this.add(chunks);
    };
    /* istanbul ignore next */ $08dc348e502451cc$var$SourceNode.prototype = {
        add: function add(chunks) {
            if ($56c405a178dd13ac$export$43bee75e5e14138e(chunks)) chunks = chunks.join("");
            this.src += chunks;
        },
        prepend: function prepend(chunks) {
            if ($56c405a178dd13ac$export$43bee75e5e14138e(chunks)) chunks = chunks.join("");
            this.src = chunks + this.src;
        },
        toStringWithSourceMap: function toStringWithSourceMap() {
            return {
                code: this.toString()
            };
        },
        toString: function toString() {
            return this.src;
        }
    };
}
function $08dc348e502451cc$var$castChunk(chunk, codeGen, loc) {
    if ($56c405a178dd13ac$export$43bee75e5e14138e(chunk)) {
        var ret = [];
        for(var i = 0, len = chunk.length; i < len; i++)ret.push(codeGen.wrap(chunk[i], loc));
        return ret;
    } else if (typeof chunk === "boolean" || typeof chunk === "number") // Handle primitives that the SourceNode will throw up on
    return chunk + "";
    return chunk;
}
function $08dc348e502451cc$var$CodeGen(srcFile) {
    this.srcFile = srcFile;
    this.source = [];
}
$08dc348e502451cc$var$CodeGen.prototype = {
    isEmpty: function isEmpty() {
        return !this.source.length;
    },
    prepend: function prepend(source, loc) {
        this.source.unshift(this.wrap(source, loc));
    },
    push: function push(source, loc) {
        this.source.push(this.wrap(source, loc));
    },
    merge: function merge() {
        var source = this.empty();
        this.each(function(line) {
            source.add([
                "  ",
                line,
                "\n"
            ]);
        });
        return source;
    },
    each: function each(iter) {
        for(var i = 0, len = this.source.length; i < len; i++)iter(this.source[i]);
    },
    empty: function empty() {
        var loc = this.currentLocation || {
            start: {}
        };
        return new $08dc348e502451cc$var$SourceNode(loc.start.line, loc.start.column, this.srcFile);
    },
    wrap: function wrap(chunk) {
        var loc = arguments.length <= 1 || arguments[1] === undefined ? this.currentLocation || {
            start: {}
        } : arguments[1];
        if (chunk instanceof $08dc348e502451cc$var$SourceNode) return chunk;
        chunk = $08dc348e502451cc$var$castChunk(chunk, this, loc);
        return new $08dc348e502451cc$var$SourceNode(loc.start.line, loc.start.column, this.srcFile, chunk);
    },
    functionCall: function functionCall(fn, type, params) {
        params = this.generateList(params);
        return this.wrap([
            fn,
            type ? "." + type + "(" : "(",
            params,
            ")"
        ]);
    },
    quotedString: function quotedString(str) {
        return '"' + (str + "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028") // Per Ecma-262 7.3 + 7.8.4
        .replace(/\u2029/g, "\\u2029") + '"';
    },
    objectLiteral: function objectLiteral(obj) {
        // istanbul ignore next
        var _this = this;
        var pairs = [];
        Object.keys(obj).forEach(function(key) {
            var value = $08dc348e502451cc$var$castChunk(obj[key], _this);
            if (value !== "undefined") pairs.push([
                _this.quotedString(key),
                ":",
                value
            ]);
        });
        var ret = this.generateList(pairs);
        ret.prepend("{");
        ret.add("}");
        return ret;
    },
    generateList: function generateList(entries) {
        var ret = this.empty();
        for(var i = 0, len = entries.length; i < len; i++){
            if (i) ret.add(",");
            ret.add($08dc348e502451cc$var$castChunk(entries[i], this));
        }
        return ret;
    },
    generateArray: function generateArray(entries) {
        var ret = this.generateList(entries);
        ret.prepend("[");
        ret.add("]");
        return ret;
    }
};
$08dc348e502451cc$exports["default"] = $08dc348e502451cc$var$CodeGen;
$08dc348e502451cc$exports = $08dc348e502451cc$exports["default"];


var $3f75992ad0df6735$var$_codeGen2 = $3f75992ad0df6735$var$_interopRequireDefault($08dc348e502451cc$exports);
function $3f75992ad0df6735$var$Literal(value) {
    this.value = value;
}
function $3f75992ad0df6735$var$JavaScriptCompiler() {}
$3f75992ad0df6735$var$JavaScriptCompiler.prototype = {
    // PUBLIC API: You can override these methods in a subclass to provide
    // alternative compiled forms for name lookup and buffering semantics
    nameLookup: function nameLookup(parent, name /*,  type */ ) {
        return this.internalNameLookup(parent, name);
    },
    depthedLookup: function depthedLookup(name) {
        return [
            this.aliasable("container.lookup"),
            "(depths, ",
            JSON.stringify(name),
            ")"
        ];
    },
    compilerInfo: function compilerInfo() {
        var revision = $382041588752eb98$export$682db5a6f2fa1046, versions = $382041588752eb98$export$534648964353ca81[revision];
        return [
            revision,
            versions
        ];
    },
    appendToBuffer: function appendToBuffer(source, location, explicit) {
        // Force a source as this simplifies the merge logic.
        if (!$56c405a178dd13ac$export$43bee75e5e14138e(source)) source = [
            source
        ];
        source = this.source.wrap(source, location);
        if (this.environment.isSimple) return [
            "return ",
            source,
            ";"
        ];
        else if (explicit) // This is a case where the buffer operation occurs as a child of another
        // construct, generally braces. We have to explicitly output these buffer
        // operations to ensure that the emitted code goes in the correct location.
        return [
            "buffer += ",
            source,
            ";"
        ];
        else {
            source.appendToBuffer = true;
            return source;
        }
    },
    initializeBuffer: function initializeBuffer() {
        return this.quotedString("");
    },
    // END PUBLIC API
    internalNameLookup: function internalNameLookup(parent, name) {
        this.lookupPropertyFunctionIsUsed = true;
        return [
            "lookupProperty(",
            parent,
            ",",
            JSON.stringify(name),
            ")"
        ];
    },
    lookupPropertyFunctionIsUsed: false,
    compile: function compile(environment, options, context, asObject) {
        this.environment = environment;
        this.options = options;
        this.stringParams = this.options.stringParams;
        this.trackIds = this.options.trackIds;
        this.precompile = !asObject;
        this.name = this.environment.name;
        this.isChild = !!context;
        this.context = context || {
            decorators: [],
            programs: [],
            environments: []
        };
        this.preamble();
        this.stackSlot = 0;
        this.stackVars = [];
        this.aliases = {};
        this.registers = {
            list: []
        };
        this.hashes = [];
        this.compileStack = [];
        this.inlineStack = [];
        this.blockParams = [];
        this.compileChildren(environment, options);
        this.useDepths = this.useDepths || environment.useDepths || environment.useDecorators || this.options.compat;
        this.useBlockParams = this.useBlockParams || environment.useBlockParams;
        var opcodes = environment.opcodes, opcode = undefined, firstLoc = undefined, i = undefined, l = undefined;
        for(i = 0, l = opcodes.length; i < l; i++){
            opcode = opcodes[i];
            this.source.currentLocation = opcode.loc;
            firstLoc = firstLoc || opcode.loc;
            this[opcode.opcode].apply(this, opcode.args);
        }
        // Flush any trailing content that might be pending.
        this.source.currentLocation = firstLoc;
        this.pushSource("");
        /* istanbul ignore next */ if (this.stackSlot || this.inlineStack.length || this.compileStack.length) throw new $3f75992ad0df6735$var$_exception2["default"]("Compile completed with content left on stack");
        if (!this.decorators.isEmpty()) {
            this.useDecorators = true;
            this.decorators.prepend([
                "var decorators = container.decorators, ",
                this.lookupPropertyFunctionVarDeclaration(),
                ";\n"
            ]);
            this.decorators.push("return fn;");
            if (asObject) this.decorators = Function.apply(this, [
                "fn",
                "props",
                "container",
                "depth0",
                "data",
                "blockParams",
                "depths",
                this.decorators.merge()
            ]);
            else {
                this.decorators.prepend("function(fn, props, container, depth0, data, blockParams, depths) {\n");
                this.decorators.push("}\n");
                this.decorators = this.decorators.merge();
            }
        } else this.decorators = undefined;
        var fn = this.createFunctionContext(asObject);
        if (!this.isChild) {
            var ret = {
                compiler: this.compilerInfo(),
                main: fn
            };
            if (this.decorators) {
                ret.main_d = this.decorators; // eslint-disable-line camelcase
                ret.useDecorators = true;
            }
            var _context = this.context;
            var programs = _context.programs;
            var decorators = _context.decorators;
            for(i = 0, l = programs.length; i < l; i++)if (programs[i]) {
                ret[i] = programs[i];
                if (decorators[i]) {
                    ret[i + "_d"] = decorators[i];
                    ret.useDecorators = true;
                }
            }
            if (this.environment.usePartial) ret.usePartial = true;
            if (this.options.data) ret.useData = true;
            if (this.useDepths) ret.useDepths = true;
            if (this.useBlockParams) ret.useBlockParams = true;
            if (this.options.compat) ret.compat = true;
            if (!asObject) {
                ret.compiler = JSON.stringify(ret.compiler);
                this.source.currentLocation = {
                    start: {
                        line: 1,
                        column: 0
                    }
                };
                ret = this.objectLiteral(ret);
                if (options.srcName) {
                    ret = ret.toStringWithSourceMap({
                        file: options.destName
                    });
                    ret.map = ret.map && ret.map.toString();
                } else ret = ret.toString();
            } else ret.compilerOptions = this.options;
            return ret;
        } else return fn;
    },
    preamble: function preamble() {
        // track the last context pushed into place to allow skipping the
        // getContext opcode when it would be a noop
        this.lastContext = 0;
        this.source = new $3f75992ad0df6735$var$_codeGen2["default"](this.options.srcName);
        this.decorators = new $3f75992ad0df6735$var$_codeGen2["default"](this.options.srcName);
    },
    createFunctionContext: function createFunctionContext(asObject) {
        // istanbul ignore next
        var _this = this;
        var varDeclarations = "";
        var locals = this.stackVars.concat(this.registers.list);
        if (locals.length > 0) varDeclarations += ", " + locals.join(", ");
        // Generate minimizer alias mappings
        //
        // When using true SourceNodes, this will update all references to the given alias
        // as the source nodes are reused in situ. For the non-source node compilation mode,
        // aliases will not be used, but this case is already being run on the client and
        // we aren't concern about minimizing the template size.
        var aliasCount = 0;
        Object.keys(this.aliases).forEach(function(alias) {
            var node = _this.aliases[alias];
            if (node.children && node.referenceCount > 1) {
                varDeclarations += ", alias" + ++aliasCount + "=" + alias;
                node.children[0] = "alias" + aliasCount;
            }
        });
        if (this.lookupPropertyFunctionIsUsed) varDeclarations += ", " + this.lookupPropertyFunctionVarDeclaration();
        var params = [
            "container",
            "depth0",
            "helpers",
            "partials",
            "data"
        ];
        if (this.useBlockParams || this.useDepths) params.push("blockParams");
        if (this.useDepths) params.push("depths");
        // Perform a second pass over the output to merge content when possible
        var source = this.mergeSource(varDeclarations);
        if (asObject) {
            params.push(source);
            return Function.apply(this, params);
        } else return this.source.wrap([
            "function(",
            params.join(","),
            ") {\n  ",
            source,
            "}"
        ]);
    },
    mergeSource: function mergeSource(varDeclarations) {
        var isSimple = this.environment.isSimple, appendOnly = !this.forceBuffer, appendFirst = undefined, sourceSeen = undefined, bufferStart = undefined, bufferEnd = undefined;
        this.source.each(function(line) {
            if (line.appendToBuffer) {
                if (bufferStart) line.prepend("  + ");
                else bufferStart = line;
                bufferEnd = line;
            } else {
                if (bufferStart) {
                    if (!sourceSeen) appendFirst = true;
                    else bufferStart.prepend("buffer += ");
                    bufferEnd.add(";");
                    bufferStart = bufferEnd = undefined;
                }
                sourceSeen = true;
                if (!isSimple) appendOnly = false;
            }
        });
        if (appendOnly) {
            if (bufferStart) {
                bufferStart.prepend("return ");
                bufferEnd.add(";");
            } else if (!sourceSeen) this.source.push('return "";');
        } else {
            varDeclarations += ", buffer = " + (appendFirst ? "" : this.initializeBuffer());
            if (bufferStart) {
                bufferStart.prepend("return buffer + ");
                bufferEnd.add(";");
            } else this.source.push("return buffer;");
        }
        if (varDeclarations) this.source.prepend("var " + varDeclarations.substring(2) + (appendFirst ? "" : ";\n"));
        return this.source.merge();
    },
    lookupPropertyFunctionVarDeclaration: function lookupPropertyFunctionVarDeclaration() {
        return "\n      lookupProperty = container.lookupProperty || function(parent, propertyName) {\n        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {\n          return parent[propertyName];\n        }\n        return undefined\n    }\n    ".trim();
    },
    // [blockValue]
    //
    // On stack, before: hash, inverse, program, value
    // On stack, after: return value of blockHelperMissing
    //
    // The purpose of this opcode is to take a block of the form
    // `{{#this.foo}}...{{/this.foo}}`, resolve the value of `foo`, and
    // replace it on the stack with the result of properly
    // invoking blockHelperMissing.
    blockValue: function blockValue(name) {
        var blockHelperMissing = this.aliasable("container.hooks.blockHelperMissing"), params = [
            this.contextName(0)
        ];
        this.setupHelperArgs(name, 0, params);
        var blockName = this.popStack();
        params.splice(1, 0, blockName);
        this.push(this.source.functionCall(blockHelperMissing, "call", params));
    },
    // [ambiguousBlockValue]
    //
    // On stack, before: hash, inverse, program, value
    // Compiler value, before: lastHelper=value of last found helper, if any
    // On stack, after, if no lastHelper: same as [blockValue]
    // On stack, after, if lastHelper: value
    ambiguousBlockValue: function ambiguousBlockValue() {
        // We're being a bit cheeky and reusing the options value from the prior exec
        var blockHelperMissing = this.aliasable("container.hooks.blockHelperMissing"), params = [
            this.contextName(0)
        ];
        this.setupHelperArgs("", 0, params, true);
        this.flushInline();
        var current = this.topStack();
        params.splice(1, 0, current);
        this.pushSource([
            "if (!",
            this.lastHelper,
            ") { ",
            current,
            " = ",
            this.source.functionCall(blockHelperMissing, "call", params),
            "}"
        ]);
    },
    // [appendContent]
    //
    // On stack, before: ...
    // On stack, after: ...
    //
    // Appends the string value of `content` to the current buffer
    appendContent: function appendContent(content) {
        if (this.pendingContent) content = this.pendingContent + content;
        else this.pendingLocation = this.source.currentLocation;
        this.pendingContent = content;
    },
    // [append]
    //
    // On stack, before: value, ...
    // On stack, after: ...
    //
    // Coerces `value` to a String and appends it to the current buffer.
    //
    // If `value` is truthy, or 0, it is coerced into a string and appended
    // Otherwise, the empty string is appended
    append: function append() {
        if (this.isInline()) {
            this.replaceStack(function(current) {
                return [
                    " != null ? ",
                    current,
                    ' : ""'
                ];
            });
            this.pushSource(this.appendToBuffer(this.popStack()));
        } else {
            var local = this.popStack();
            this.pushSource([
                "if (",
                local,
                " != null) { ",
                this.appendToBuffer(local, undefined, true),
                " }"
            ]);
            if (this.environment.isSimple) this.pushSource([
                "else { ",
                this.appendToBuffer("''", undefined, true),
                " }"
            ]);
        }
    },
    // [appendEscaped]
    //
    // On stack, before: value, ...
    // On stack, after: ...
    //
    // Escape `value` and append it to the buffer
    appendEscaped: function appendEscaped() {
        this.pushSource(this.appendToBuffer([
            this.aliasable("container.escapeExpression"),
            "(",
            this.popStack(),
            ")"
        ]));
    },
    // [getContext]
    //
    // On stack, before: ...
    // On stack, after: ...
    // Compiler value, after: lastContext=depth
    //
    // Set the value of the `lastContext` compiler value to the depth
    getContext: function getContext(depth) {
        this.lastContext = depth;
    },
    // [pushContext]
    //
    // On stack, before: ...
    // On stack, after: currentContext, ...
    //
    // Pushes the value of the current context onto the stack.
    pushContext: function pushContext() {
        this.pushStackLiteral(this.contextName(this.lastContext));
    },
    // [lookupOnContext]
    //
    // On stack, before: ...
    // On stack, after: currentContext[name], ...
    //
    // Looks up the value of `name` on the current context and pushes
    // it onto the stack.
    lookupOnContext: function lookupOnContext(parts, falsy, strict, scoped) {
        var i = 0;
        if (!scoped && this.options.compat && !this.lastContext) // The depthed query is expected to handle the undefined logic for the root level that
        // is implemented below, so we evaluate that directly in compat mode
        this.push(this.depthedLookup(parts[i++]));
        else this.pushContext();
        this.resolvePath("context", parts, i, falsy, strict);
    },
    // [lookupBlockParam]
    //
    // On stack, before: ...
    // On stack, after: blockParam[name], ...
    //
    // Looks up the value of `parts` on the given block param and pushes
    // it onto the stack.
    lookupBlockParam: function lookupBlockParam(blockParamId, parts) {
        this.useBlockParams = true;
        this.push([
            "blockParams[",
            blockParamId[0],
            "][",
            blockParamId[1],
            "]"
        ]);
        this.resolvePath("context", parts, 1);
    },
    // [lookupData]
    //
    // On stack, before: ...
    // On stack, after: data, ...
    //
    // Push the data lookup operator
    lookupData: function lookupData(depth, parts, strict) {
        if (!depth) this.pushStackLiteral("data");
        else this.pushStackLiteral("container.data(data, " + depth + ")");
        this.resolvePath("data", parts, 0, true, strict);
    },
    resolvePath: function resolvePath(type, parts, i, falsy, strict) {
        // istanbul ignore next
        var _this2 = this;
        if (this.options.strict || this.options.assumeObjects) {
            this.push($3f75992ad0df6735$var$strictLookup(this.options.strict && strict, this, parts, type));
            return;
        }
        var len = parts.length;
        for(; i < len; i++)/* eslint-disable no-loop-func */ this.replaceStack(function(current) {
            var lookup = _this2.nameLookup(current, parts[i], type);
            // We want to ensure that zero and false are handled properly if the context (falsy flag)
            // needs to have the special handling for these values.
            if (!falsy) return [
                " != null ? ",
                lookup,
                " : ",
                current
            ];
            else // Otherwise we can use generic falsy handling
            return [
                " && ",
                lookup
            ];
        });
    },
    // [resolvePossibleLambda]
    //
    // On stack, before: value, ...
    // On stack, after: resolved value, ...
    //
    // If the `value` is a lambda, replace it on the stack by
    // the return value of the lambda
    resolvePossibleLambda: function resolvePossibleLambda() {
        this.push([
            this.aliasable("container.lambda"),
            "(",
            this.popStack(),
            ", ",
            this.contextName(0),
            ")"
        ]);
    },
    // [pushStringParam]
    //
    // On stack, before: ...
    // On stack, after: string, currentContext, ...
    //
    // This opcode is designed for use in string mode, which
    // provides the string value of a parameter along with its
    // depth rather than resolving it immediately.
    pushStringParam: function pushStringParam(string, type) {
        this.pushContext();
        this.pushString(type);
        // If it's a subexpression, the string result
        // will be pushed after this opcode.
        if (type !== "SubExpression") {
            if (typeof string === "string") this.pushString(string);
            else this.pushStackLiteral(string);
        }
    },
    emptyHash: function emptyHash(omitEmpty) {
        if (this.trackIds) this.push("{}"); // hashIds
        if (this.stringParams) {
            this.push("{}"); // hashContexts
            this.push("{}"); // hashTypes
        }
        this.pushStackLiteral(omitEmpty ? "undefined" : "{}");
    },
    pushHash: function pushHash() {
        if (this.hash) this.hashes.push(this.hash);
        this.hash = {
            values: {},
            types: [],
            contexts: [],
            ids: []
        };
    },
    popHash: function popHash() {
        var hash = this.hash;
        this.hash = this.hashes.pop();
        if (this.trackIds) this.push(this.objectLiteral(hash.ids));
        if (this.stringParams) {
            this.push(this.objectLiteral(hash.contexts));
            this.push(this.objectLiteral(hash.types));
        }
        this.push(this.objectLiteral(hash.values));
    },
    // [pushString]
    //
    // On stack, before: ...
    // On stack, after: quotedString(string), ...
    //
    // Push a quoted version of `string` onto the stack
    pushString: function pushString(string) {
        this.pushStackLiteral(this.quotedString(string));
    },
    // [pushLiteral]
    //
    // On stack, before: ...
    // On stack, after: value, ...
    //
    // Pushes a value onto the stack. This operation prevents
    // the compiler from creating a temporary variable to hold
    // it.
    pushLiteral: function pushLiteral(value) {
        this.pushStackLiteral(value);
    },
    // [pushProgram]
    //
    // On stack, before: ...
    // On stack, after: program(guid), ...
    //
    // Push a program expression onto the stack. This takes
    // a compile-time guid and converts it into a runtime-accessible
    // expression.
    pushProgram: function pushProgram(guid) {
        if (guid != null) this.pushStackLiteral(this.programExpression(guid));
        else this.pushStackLiteral(null);
    },
    // [registerDecorator]
    //
    // On stack, before: hash, program, params..., ...
    // On stack, after: ...
    //
    // Pops off the decorator's parameters, invokes the decorator,
    // and inserts the decorator into the decorators list.
    registerDecorator: function registerDecorator(paramSize, name) {
        var foundDecorator = this.nameLookup("decorators", name, "decorator"), options = this.setupHelperArgs(name, paramSize);
        this.decorators.push([
            "fn = ",
            this.decorators.functionCall(foundDecorator, "", [
                "fn",
                "props",
                "container",
                options
            ]),
            " || fn;"
        ]);
    },
    // [invokeHelper]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of helper invocation
    //
    // Pops off the helper's parameters, invokes the helper,
    // and pushes the helper's return value onto the stack.
    //
    // If the helper is not found, `helperMissing` is called.
    invokeHelper: function invokeHelper(paramSize, name, isSimple) {
        var nonHelper = this.popStack(), helper = this.setupHelper(paramSize, name);
        var possibleFunctionCalls = [];
        if (isSimple) // direct call to helper
        possibleFunctionCalls.push(helper.name);
        // call a function from the input object
        possibleFunctionCalls.push(nonHelper);
        if (!this.options.strict) possibleFunctionCalls.push(this.aliasable("container.hooks.helperMissing"));
        var functionLookupCode = [
            "(",
            this.itemsSeparatedBy(possibleFunctionCalls, "||"),
            ")"
        ];
        var functionCall = this.source.functionCall(functionLookupCode, "call", helper.callParams);
        this.push(functionCall);
    },
    itemsSeparatedBy: function itemsSeparatedBy(items, separator) {
        var result = [];
        result.push(items[0]);
        for(var i = 1; i < items.length; i++)result.push(separator, items[i]);
        return result;
    },
    // [invokeKnownHelper]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of helper invocation
    //
    // This operation is used when the helper is known to exist,
    // so a `helperMissing` fallback is not required.
    invokeKnownHelper: function invokeKnownHelper(paramSize, name) {
        var helper = this.setupHelper(paramSize, name);
        this.push(this.source.functionCall(helper.name, "call", helper.callParams));
    },
    // [invokeAmbiguous]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of disambiguation
    //
    // This operation is used when an expression like `{{foo}}`
    // is provided, but we don't know at compile-time whether it
    // is a helper or a path.
    //
    // This operation emits more code than the other options,
    // and can be avoided by passing the `knownHelpers` and
    // `knownHelpersOnly` flags at compile-time.
    invokeAmbiguous: function invokeAmbiguous(name, helperCall) {
        this.useRegister("helper");
        var nonHelper = this.popStack();
        this.emptyHash();
        var helper = this.setupHelper(0, name, helperCall);
        var helperName = this.lastHelper = this.nameLookup("helpers", name, "helper");
        var lookup = [
            "(",
            "(helper = ",
            helperName,
            " || ",
            nonHelper,
            ")"
        ];
        if (!this.options.strict) {
            lookup[0] = "(helper = ";
            lookup.push(" != null ? helper : ", this.aliasable("container.hooks.helperMissing"));
        }
        this.push([
            "(",
            lookup,
            helper.paramsInit ? [
                "),(",
                helper.paramsInit
            ] : [],
            "),",
            "(typeof helper === ",
            this.aliasable('"function"'),
            " ? ",
            this.source.functionCall("helper", "call", helper.callParams),
            " : helper))"
        ]);
    },
    // [invokePartial]
    //
    // On stack, before: context, ...
    // On stack after: result of partial invocation
    //
    // This operation pops off a context, invokes a partial with that context,
    // and pushes the result of the invocation back.
    invokePartial: function invokePartial(isDynamic, name, indent) {
        var params = [], options = this.setupParams(name, 1, params);
        if (isDynamic) {
            name = this.popStack();
            delete options.name;
        }
        if (indent) options.indent = JSON.stringify(indent);
        options.helpers = "helpers";
        options.partials = "partials";
        options.decorators = "container.decorators";
        if (!isDynamic) params.unshift(this.nameLookup("partials", name, "partial"));
        else params.unshift(name);
        if (this.options.compat) options.depths = "depths";
        options = this.objectLiteral(options);
        params.push(options);
        this.push(this.source.functionCall("container.invokePartial", "", params));
    },
    // [assignToHash]
    //
    // On stack, before: value, ..., hash, ...
    // On stack, after: ..., hash, ...
    //
    // Pops a value off the stack and assigns it to the current hash
    assignToHash: function assignToHash(key) {
        var value = this.popStack(), context = undefined, type = undefined, id = undefined;
        if (this.trackIds) id = this.popStack();
        if (this.stringParams) {
            type = this.popStack();
            context = this.popStack();
        }
        var hash = this.hash;
        if (context) hash.contexts[key] = context;
        if (type) hash.types[key] = type;
        if (id) hash.ids[key] = id;
        hash.values[key] = value;
    },
    pushId: function pushId(type, name, child) {
        if (type === "BlockParam") this.pushStackLiteral("blockParams[" + name[0] + "].path[" + name[1] + "]" + (child ? " + " + JSON.stringify("." + child) : ""));
        else if (type === "PathExpression") this.pushString(name);
        else if (type === "SubExpression") this.pushStackLiteral("true");
        else this.pushStackLiteral("null");
    },
    // HELPERS
    compiler: $3f75992ad0df6735$var$JavaScriptCompiler,
    compileChildren: function compileChildren(environment, options) {
        var children = environment.children, child = undefined, compiler = undefined;
        for(var i = 0, l = children.length; i < l; i++){
            child = children[i];
            compiler = new this.compiler(); // eslint-disable-line new-cap
            var existing = this.matchExistingProgram(child);
            if (existing == null) {
                this.context.programs.push(""); // Placeholder to prevent name conflicts for nested children
                var index = this.context.programs.length;
                child.index = index;
                child.name = "program" + index;
                this.context.programs[index] = compiler.compile(child, options, this.context, !this.precompile);
                this.context.decorators[index] = compiler.decorators;
                this.context.environments[index] = child;
                this.useDepths = this.useDepths || compiler.useDepths;
                this.useBlockParams = this.useBlockParams || compiler.useBlockParams;
                child.useDepths = this.useDepths;
                child.useBlockParams = this.useBlockParams;
            } else {
                child.index = existing.index;
                child.name = "program" + existing.index;
                this.useDepths = this.useDepths || existing.useDepths;
                this.useBlockParams = this.useBlockParams || existing.useBlockParams;
            }
        }
    },
    matchExistingProgram: function matchExistingProgram(child) {
        for(var i = 0, len = this.context.environments.length; i < len; i++){
            var environment = this.context.environments[i];
            if (environment && environment.equals(child)) return environment;
        }
    },
    programExpression: function programExpression(guid) {
        var child = this.environment.children[guid], programParams = [
            child.index,
            "data",
            child.blockParams
        ];
        if (this.useBlockParams || this.useDepths) programParams.push("blockParams");
        if (this.useDepths) programParams.push("depths");
        return "container.program(" + programParams.join(", ") + ")";
    },
    useRegister: function useRegister(name) {
        if (!this.registers[name]) {
            this.registers[name] = true;
            this.registers.list.push(name);
        }
    },
    push: function push(expr) {
        if (!(expr instanceof $3f75992ad0df6735$var$Literal)) expr = this.source.wrap(expr);
        this.inlineStack.push(expr);
        return expr;
    },
    pushStackLiteral: function pushStackLiteral(item) {
        this.push(new $3f75992ad0df6735$var$Literal(item));
    },
    pushSource: function pushSource(source) {
        if (this.pendingContent) {
            this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation));
            this.pendingContent = undefined;
        }
        if (source) this.source.push(source);
    },
    replaceStack: function replaceStack(callback) {
        var prefix = [
            "("
        ], stack = undefined, createdStack = undefined, usedLiteral = undefined;
        /* istanbul ignore next */ if (!this.isInline()) throw new $3f75992ad0df6735$var$_exception2["default"]("replaceStack on non-inline");
        // We want to merge the inline statement into the replacement statement via ','
        var top = this.popStack(true);
        if (top instanceof $3f75992ad0df6735$var$Literal) {
            // Literals do not need to be inlined
            stack = [
                top.value
            ];
            prefix = [
                "(",
                stack
            ];
            usedLiteral = true;
        } else {
            // Get or create the current stack name for use by the inline
            createdStack = true;
            var _name = this.incrStack();
            prefix = [
                "((",
                this.push(_name),
                " = ",
                top,
                ")"
            ];
            stack = this.topStack();
        }
        var item = callback.call(this, stack);
        if (!usedLiteral) this.popStack();
        if (createdStack) this.stackSlot--;
        this.push(prefix.concat(item, ")"));
    },
    incrStack: function incrStack() {
        this.stackSlot++;
        if (this.stackSlot > this.stackVars.length) this.stackVars.push("stack" + this.stackSlot);
        return this.topStackName();
    },
    topStackName: function topStackName() {
        return "stack" + this.stackSlot;
    },
    flushInline: function flushInline() {
        var inlineStack = this.inlineStack;
        this.inlineStack = [];
        for(var i = 0, len = inlineStack.length; i < len; i++){
            var entry = inlineStack[i];
            /* istanbul ignore if */ if (entry instanceof $3f75992ad0df6735$var$Literal) this.compileStack.push(entry);
            else {
                var stack = this.incrStack();
                this.pushSource([
                    stack,
                    " = ",
                    entry,
                    ";"
                ]);
                this.compileStack.push(stack);
            }
        }
    },
    isInline: function isInline() {
        return this.inlineStack.length;
    },
    popStack: function popStack(wrapped) {
        var inline = this.isInline(), item = (inline ? this.inlineStack : this.compileStack).pop();
        if (!wrapped && item instanceof $3f75992ad0df6735$var$Literal) return item.value;
        else {
            if (!inline) {
                /* istanbul ignore next */ if (!this.stackSlot) throw new $3f75992ad0df6735$var$_exception2["default"]("Invalid stack pop");
                this.stackSlot--;
            }
            return item;
        }
    },
    topStack: function topStack() {
        var stack = this.isInline() ? this.inlineStack : this.compileStack, item = stack[stack.length - 1];
        /* istanbul ignore if */ if (item instanceof $3f75992ad0df6735$var$Literal) return item.value;
        else return item;
    },
    contextName: function contextName(context) {
        if (this.useDepths && context) return "depths[" + context + "]";
        else return "depth" + context;
    },
    quotedString: function quotedString(str) {
        return this.source.quotedString(str);
    },
    objectLiteral: function objectLiteral(obj) {
        return this.source.objectLiteral(obj);
    },
    aliasable: function aliasable(name) {
        var ret = this.aliases[name];
        if (ret) {
            ret.referenceCount++;
            return ret;
        }
        ret = this.aliases[name] = this.source.wrap(name);
        ret.aliasable = true;
        ret.referenceCount = 1;
        return ret;
    },
    setupHelper: function setupHelper(paramSize, name, blockHelper) {
        var params = [], paramsInit = this.setupHelperArgs(name, paramSize, params, blockHelper);
        var foundHelper = this.nameLookup("helpers", name, "helper"), callContext = this.aliasable(this.contextName(0) + " != null ? " + this.contextName(0) + " : (container.nullContext || {})");
        return {
            params: params,
            paramsInit: paramsInit,
            name: foundHelper,
            callParams: [
                callContext
            ].concat(params)
        };
    },
    setupParams: function setupParams(helper, paramSize, params) {
        var options = {}, contexts = [], types = [], ids = [], objectArgs = !params, param = undefined;
        if (objectArgs) params = [];
        options.name = this.quotedString(helper);
        options.hash = this.popStack();
        if (this.trackIds) options.hashIds = this.popStack();
        if (this.stringParams) {
            options.hashTypes = this.popStack();
            options.hashContexts = this.popStack();
        }
        var inverse = this.popStack(), program = this.popStack();
        // Avoid setting fn and inverse if neither are set. This allows
        // helpers to do a check for `if (options.fn)`
        if (program || inverse) {
            options.fn = program || "container.noop";
            options.inverse = inverse || "container.noop";
        }
        // The parameters go on to the stack in order (making sure that they are evaluated in order)
        // so we need to pop them off the stack in reverse order
        var i = paramSize;
        while(i--){
            param = this.popStack();
            params[i] = param;
            if (this.trackIds) ids[i] = this.popStack();
            if (this.stringParams) {
                types[i] = this.popStack();
                contexts[i] = this.popStack();
            }
        }
        if (objectArgs) options.args = this.source.generateArray(params);
        if (this.trackIds) options.ids = this.source.generateArray(ids);
        if (this.stringParams) {
            options.types = this.source.generateArray(types);
            options.contexts = this.source.generateArray(contexts);
        }
        if (this.options.data) options.data = "data";
        if (this.useBlockParams) options.blockParams = "blockParams";
        return options;
    },
    setupHelperArgs: function setupHelperArgs(helper, paramSize, params, useRegister) {
        var options = this.setupParams(helper, paramSize, params);
        options.loc = JSON.stringify(this.source.currentLocation);
        options = this.objectLiteral(options);
        if (useRegister) {
            this.useRegister("options");
            params.push("options");
            return [
                "options=",
                options
            ];
        } else if (params) {
            params.push(options);
            return "";
        } else return options;
    }
};
(function() {
    var reservedWords = "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield await null true false".split(" ");
    var compilerWords = $3f75992ad0df6735$var$JavaScriptCompiler.RESERVED_WORDS = {};
    for(var i = 0, l = reservedWords.length; i < l; i++)compilerWords[reservedWords[i]] = true;
})();
/**
 * @deprecated May be removed in the next major version
 */ $3f75992ad0df6735$var$JavaScriptCompiler.isValidJavaScriptVariableName = function(name) {
    return !$3f75992ad0df6735$var$JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name);
};
function $3f75992ad0df6735$var$strictLookup(requireTerminal, compiler, parts, type) {
    var stack = compiler.popStack(), i = 0, len = parts.length;
    if (requireTerminal) len--;
    for(; i < len; i++)stack = compiler.nameLookup(stack, parts[i], type);
    if (requireTerminal) return [
        compiler.aliasable("container.strict"),
        "(",
        stack,
        ", ",
        compiler.quotedString(parts[i]),
        ", ",
        JSON.stringify(compiler.source.currentLocation),
        " )"
    ];
    else return stack;
}
$3f75992ad0df6735$exports["default"] = $3f75992ad0df6735$var$JavaScriptCompiler;
$3f75992ad0df6735$exports = $3f75992ad0df6735$exports["default"];


var $b9e82dc90bf8f880$var$_handlebarsCompilerJavascriptCompiler2 = $b9e82dc90bf8f880$var$_interopRequireDefault($3f75992ad0df6735$exports);

var $b9e82dc90bf8f880$var$_handlebarsCompilerVisitor2 = $b9e82dc90bf8f880$var$_interopRequireDefault($9e02a88a4e2c4dd9$exports);

var $b9e82dc90bf8f880$var$_handlebarsNoConflict2 = $b9e82dc90bf8f880$var$_interopRequireDefault($67e016f14749198d$exports);
var $b9e82dc90bf8f880$var$_create = $b9e82dc90bf8f880$var$_handlebarsRuntime2["default"].create;
function $b9e82dc90bf8f880$var$create() {
    var hb = $b9e82dc90bf8f880$var$_create();
    hb.compile = function(input, options) {
        return $154968517acd1d98$export$ef7acd7185315e22(input, options, hb);
    };
    hb.precompile = function(input, options) {
        return $154968517acd1d98$export$cfb9e0f1330f9bbd(input, options, hb);
    };
    hb.AST = $b9e82dc90bf8f880$var$_handlebarsCompilerAst2["default"];
    hb.Compiler = $154968517acd1d98$export$3a6335acfcf707c9;
    hb.JavaScriptCompiler = $b9e82dc90bf8f880$var$_handlebarsCompilerJavascriptCompiler2["default"];
    hb.Parser = $9eaa0297a6df13c2$export$8f49e4af10703ce3;
    hb.parse = $9eaa0297a6df13c2$export$98e6a39c04603d36;
    hb.parseWithoutProcessing = $9eaa0297a6df13c2$export$fc85b2c4462e0bc6;
    return hb;
}
var $b9e82dc90bf8f880$var$inst = $b9e82dc90bf8f880$var$create();
$b9e82dc90bf8f880$var$inst.create = $b9e82dc90bf8f880$var$create;
$b9e82dc90bf8f880$var$_handlebarsNoConflict2["default"]($b9e82dc90bf8f880$var$inst);
$b9e82dc90bf8f880$var$inst.Visitor = $b9e82dc90bf8f880$var$_handlebarsCompilerVisitor2["default"];
$b9e82dc90bf8f880$var$inst["default"] = $b9e82dc90bf8f880$var$inst;
$b9e82dc90bf8f880$exports["default"] = $b9e82dc90bf8f880$var$inst;
$b9e82dc90bf8f880$exports = $b9e82dc90bf8f880$exports["default"];


// USAGE:
// var handlebars = require('handlebars');
/* eslint-disable no-var */ // var local = handlebars.create();
var $e0b8ee1f151445ce$var$handlebars = $b9e82dc90bf8f880$exports.default;
var $c18027298e895c87$export$1e511d4a378977f5;
var $c18027298e895c87$export$c2d084dc44961371;
var $c18027298e895c87$export$142230c39e312c23;
/* eslint-disable new-cap */ "use strict";
$c18027298e895c87$export$1e511d4a378977f5 = true;
$c18027298e895c87$export$c2d084dc44961371 = $c18027298e895c87$var$print;
$c18027298e895c87$export$142230c39e312c23 = $c18027298e895c87$var$PrintVisitor;
// istanbul ignore next
function $c18027298e895c87$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}

var $c18027298e895c87$var$_visitor2 = $c18027298e895c87$var$_interopRequireDefault($9e02a88a4e2c4dd9$exports);
function $c18027298e895c87$var$print(ast) {
    return new $c18027298e895c87$var$PrintVisitor().accept(ast);
}
function $c18027298e895c87$var$PrintVisitor() {
    this.padding = 0;
}
$c18027298e895c87$var$PrintVisitor.prototype = new $c18027298e895c87$var$_visitor2["default"]();
$c18027298e895c87$var$PrintVisitor.prototype.pad = function(string) {
    var out = "";
    for(var i = 0, l = this.padding; i < l; i++)out += "  ";
    out += string + "\n";
    return out;
};
$c18027298e895c87$var$PrintVisitor.prototype.Program = function(program) {
    var out = "", body = program.body, i = undefined, l = undefined;
    if (program.blockParams) {
        var blockParams = "BLOCK PARAMS: [";
        for(i = 0, l = program.blockParams.length; i < l; i++)blockParams += " " + program.blockParams[i];
        blockParams += " ]";
        out += this.pad(blockParams);
    }
    for(i = 0, l = body.length; i < l; i++)out += this.accept(body[i]);
    this.padding--;
    return out;
};
$c18027298e895c87$var$PrintVisitor.prototype.MustacheStatement = function(mustache) {
    return this.pad("{{ " + this.SubExpression(mustache) + " }}");
};
$c18027298e895c87$var$PrintVisitor.prototype.Decorator = function(mustache) {
    return this.pad("{{ DIRECTIVE " + this.SubExpression(mustache) + " }}");
};
$c18027298e895c87$var$PrintVisitor.prototype.BlockStatement = $c18027298e895c87$var$PrintVisitor.prototype.DecoratorBlock = function(block) {
    var out = "";
    out += this.pad((block.type === "DecoratorBlock" ? "DIRECTIVE " : "") + "BLOCK:");
    this.padding++;
    out += this.pad(this.SubExpression(block));
    if (block.program) {
        out += this.pad("PROGRAM:");
        this.padding++;
        out += this.accept(block.program);
        this.padding--;
    }
    if (block.inverse) {
        if (block.program) this.padding++;
        out += this.pad("{{^}}");
        this.padding++;
        out += this.accept(block.inverse);
        this.padding--;
        if (block.program) this.padding--;
    }
    this.padding--;
    return out;
};
$c18027298e895c87$var$PrintVisitor.prototype.PartialStatement = function(partial) {
    var content = "PARTIAL:" + partial.name.original;
    if (partial.params[0]) content += " " + this.accept(partial.params[0]);
    if (partial.hash) content += " " + this.accept(partial.hash);
    return this.pad("{{> " + content + " }}");
};
$c18027298e895c87$var$PrintVisitor.prototype.PartialBlockStatement = function(partial) {
    var content = "PARTIAL BLOCK:" + partial.name.original;
    if (partial.params[0]) content += " " + this.accept(partial.params[0]);
    if (partial.hash) content += " " + this.accept(partial.hash);
    content += " " + this.pad("PROGRAM:");
    this.padding++;
    content += this.accept(partial.program);
    this.padding--;
    return this.pad("{{> " + content + " }}");
};
$c18027298e895c87$var$PrintVisitor.prototype.ContentStatement = function(content) {
    return this.pad("CONTENT[ '" + content.value + "' ]");
};
$c18027298e895c87$var$PrintVisitor.prototype.CommentStatement = function(comment) {
    return this.pad("{{! '" + comment.value + "' }}");
};
$c18027298e895c87$var$PrintVisitor.prototype.SubExpression = function(sexpr) {
    var params = sexpr.params, paramStrings = [], hash = undefined;
    for(var i = 0, l = params.length; i < l; i++)paramStrings.push(this.accept(params[i]));
    params = "[" + paramStrings.join(", ") + "]";
    hash = sexpr.hash ? " " + this.accept(sexpr.hash) : "";
    return this.accept(sexpr.path) + " " + params + hash;
};
$c18027298e895c87$var$PrintVisitor.prototype.PathExpression = function(id) {
    var path = id.parts.join("/");
    return (id.data ? "@" : "") + "PATH:" + path;
};
$c18027298e895c87$var$PrintVisitor.prototype.StringLiteral = function(string) {
    return '"' + string.value + '"';
};
$c18027298e895c87$var$PrintVisitor.prototype.NumberLiteral = function(number) {
    return "NUMBER{" + number.value + "}";
};
$c18027298e895c87$var$PrintVisitor.prototype.BooleanLiteral = function(bool) {
    return "BOOLEAN{" + bool.value + "}";
};
$c18027298e895c87$var$PrintVisitor.prototype.UndefinedLiteral = function() {
    return "UNDEFINED";
};
$c18027298e895c87$var$PrintVisitor.prototype.NullLiteral = function() {
    return "NULL";
};
$c18027298e895c87$var$PrintVisitor.prototype.Hash = function(hash) {
    var pairs = hash.pairs, joinedPairs = [];
    for(var i = 0, l = pairs.length; i < l; i++)joinedPairs.push(this.accept(pairs[i]));
    return "HASH{" + joinedPairs.join(", ") + "}";
};
$c18027298e895c87$var$PrintVisitor.prototype.HashPair = function(pair) {
    return pair.key + "=" + this.accept(pair.value);
}; /* eslint-enable new-cap */ 


$e0b8ee1f151445ce$var$handlebars.PrintVisitor = $c18027298e895c87$export$142230c39e312c23;
$e0b8ee1f151445ce$var$handlebars.print = $c18027298e895c87$export$c2d084dc44961371;
$e0b8ee1f151445ce$exports = $e0b8ee1f151445ce$var$handlebars;

// Publish a Node.js require() handler for .handlebars and .hbs files
function $e0b8ee1f151445ce$var$extension(module1, filename) {
    var fs = (parcelRequire("8fzNa"));
    var templateString = fs.readFileSync(filename, "utf8");
    module1.exports = $e0b8ee1f151445ce$var$handlebars.compile(templateString);
}
/* istanbul ignore else */ if (undefined) {
    undefined[".handlebars"] = $e0b8ee1f151445ce$var$extension;
    undefined[".hbs"] = $e0b8ee1f151445ce$var$extension;
}


var $29884d0f09dc3289$var$randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var $29884d0f09dc3289$export$2e2bcd8739ae039 = {
    randomUUID: $29884d0f09dc3289$var$randomUUID
};


// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var $a6540b1f531f64d5$var$getRandomValues;
var $a6540b1f531f64d5$var$rnds8 = new Uint8Array(16);
function $a6540b1f531f64d5$export$2e2bcd8739ae039() {
    // lazy load so that environments that need to polyfill have a chance to do so
    if (!$a6540b1f531f64d5$var$getRandomValues) {
        // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
        $a6540b1f531f64d5$var$getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
        if (!$a6540b1f531f64d5$var$getRandomValues) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
    return $a6540b1f531f64d5$var$getRandomValues($a6540b1f531f64d5$var$rnds8);
}


var $091db65530f49417$export$2e2bcd8739ae039 = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;


function $b454ce1874a7f71f$var$validate(uuid) {
    return typeof uuid === "string" && (0, $091db65530f49417$export$2e2bcd8739ae039).test(uuid);
}
var $b454ce1874a7f71f$export$2e2bcd8739ae039 = $b454ce1874a7f71f$var$validate;


/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */ var $9e2c5136d8b48a60$var$byteToHex = [];
for(var $9e2c5136d8b48a60$var$i = 0; $9e2c5136d8b48a60$var$i < 256; ++$9e2c5136d8b48a60$var$i)$9e2c5136d8b48a60$var$byteToHex.push(($9e2c5136d8b48a60$var$i + 0x100).toString(16).slice(1));
function $9e2c5136d8b48a60$export$8fb373d660548968(arr) {
    var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    // Note: Be careful editing this code!  It's been tuned for performance
    // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
    return ($9e2c5136d8b48a60$var$byteToHex[arr[offset + 0]] + $9e2c5136d8b48a60$var$byteToHex[arr[offset + 1]] + $9e2c5136d8b48a60$var$byteToHex[arr[offset + 2]] + $9e2c5136d8b48a60$var$byteToHex[arr[offset + 3]] + "-" + $9e2c5136d8b48a60$var$byteToHex[arr[offset + 4]] + $9e2c5136d8b48a60$var$byteToHex[arr[offset + 5]] + "-" + $9e2c5136d8b48a60$var$byteToHex[arr[offset + 6]] + $9e2c5136d8b48a60$var$byteToHex[arr[offset + 7]] + "-" + $9e2c5136d8b48a60$var$byteToHex[arr[offset + 8]] + $9e2c5136d8b48a60$var$byteToHex[arr[offset + 9]] + "-" + $9e2c5136d8b48a60$var$byteToHex[arr[offset + 10]] + $9e2c5136d8b48a60$var$byteToHex[arr[offset + 11]] + $9e2c5136d8b48a60$var$byteToHex[arr[offset + 12]] + $9e2c5136d8b48a60$var$byteToHex[arr[offset + 13]] + $9e2c5136d8b48a60$var$byteToHex[arr[offset + 14]] + $9e2c5136d8b48a60$var$byteToHex[arr[offset + 15]]).toLowerCase();
}
function $9e2c5136d8b48a60$var$stringify(arr) {
    var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    var uuid = $9e2c5136d8b48a60$export$8fb373d660548968(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
    // of the following:
    // - One or more input array values don't map to a hex octet (leading to
    // "undefined" in the uuid)
    // - Invalid input values for the RFC `version` or `variant` fields
    if (!(0, $b454ce1874a7f71f$export$2e2bcd8739ae039)(uuid)) throw TypeError("Stringified UUID is invalid");
    return uuid;
}
var $9e2c5136d8b48a60$export$2e2bcd8739ae039 = $9e2c5136d8b48a60$var$stringify;


function $497149f04afaff89$var$v4(options, buf, offset) {
    if ((0, $29884d0f09dc3289$export$2e2bcd8739ae039).randomUUID && !buf && !options) return (0, $29884d0f09dc3289$export$2e2bcd8739ae039).randomUUID();
    options = options || {};
    var rnds = options.random || (options.rng || (0, $a6540b1f531f64d5$export$2e2bcd8739ae039))(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided
    if (buf) {
        offset = offset || 0;
        for(var i = 0; i < 16; ++i)buf[offset + i] = rnds[i];
        return buf;
    }
    return (0, $9e2c5136d8b48a60$export$8fb373d660548968)(rnds);
}
var $497149f04afaff89$export$2e2bcd8739ae039 = $497149f04afaff89$var$v4;







function $f3c6f5393a67d3dc$export$2e2bcd8739ae039(arr) {
    if (Array.isArray(arr)) return (0, $851de69faa6c2fa2$export$2e2bcd8739ae039)(arr);
}



function $1696ad461ae00847$export$2e2bcd8739ae039() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}



function $0e1afeb7cbac8f7a$export$2e2bcd8739ae039(arr) {
    return (0, $f3c6f5393a67d3dc$export$2e2bcd8739ae039)(arr) || (0, $e59b4934c399cd12$export$2e2bcd8739ae039)(arr) || (0, $ce589fc85e36058f$export$2e2bcd8739ae039)(arr) || (0, $1696ad461ae00847$export$2e2bcd8739ae039)();
}


var $58a4a026fea3588f$export$2e2bcd8739ae039 = /*#__PURE__*/ function() {
    "use strict";
    function EventBus() {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, EventBus);
        (0, $f32bfd8434ef5009$export$2e2bcd8739ae039)(this, "_listeners", {});
    }
    (0, $37aec4d01f6984fa$export$2e2bcd8739ae039)(EventBus, [
        {
            key: "on",
            value: function on(event, callback) {
                if (!this._listeners[event]) this._listeners[event] = [];
                this._listeners[event].push(callback);
            }
        },
        {
            key: "emit",
            value: function emit(event) {
                for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                    args[_key - 1] = arguments[_key];
                }
                if (!this._listeners[event]) return;
                this._listeners[event].forEach(function(callback) {
                    callback.apply(void 0, (0, $0e1afeb7cbac8f7a$export$2e2bcd8739ae039)(args));
                });
            }
        },
        {
            key: "off",
            value: function off(event, callback) {
                if (!this._listeners[event]) return;
                this._listeners[event] = this._listeners[event].filter(function(item) {
                    return item !== callback;
                });
            }
        }
    ]);
    return EventBus;
}();



function $fd9f47336095cd04$export$2e2bcd8739ae039(value) {
    return value instanceof (0, $c53c9d43678cab83$export$2e2bcd8739ae039);
}



function $1aa9c0abde2b3cbc$export$2e2bcd8739ae039(value) {
    var res;
    if (Array.isArray(value)) res = value.every((0, $fd9f47336095cd04$export$2e2bcd8739ae039));
    else res = false;
    return res;
}


function $44a8176be4e63a6c$export$629a2bd3f5a49ecc(obj) {
    // eslint-disable-next-line
    return function _cloneDeep(item) {
        // Handle:
        // * null
        // * undefined
        // * boolean
        // * number
        // * string
        // * symbol
        // * function
        if (item === null || typeof item !== "object") return item;
        // Handle:
        // * Date
        if (item instanceof Date) return new Date(item.valueOf());
        // Handle:
        // * Array
        if (item instanceof Array) {
            var copy = [];
            item.forEach(function(_, i) {
                return copy[i] = _cloneDeep(item[i]);
            });
            return copy;
        }
        // Handle:
        // * Set
        if (item instanceof Set) {
            var copy1 = new Set();
            item.forEach(function(v) {
                return copy1.add(_cloneDeep(v));
            });
            return copy1;
        }
        // Handle:
        // * Map
        if (item instanceof Map) {
            var copy2 = new Map();
            item.forEach(function(v, k) {
                return copy2.set(k, _cloneDeep(v));
            });
            return copy2;
        }
        // Handle:
        // * Object
        if (item instanceof Object) {
            // eslint-disable-next-line
            var copy3 = {};
            // Handle:
            // * Object.symbol
            Object.getOwnPropertySymbols(item).forEach(function(s) {
                return copy3[s] = _cloneDeep(item[s]);
            });
            // Handle:
            // * Object.name (other)
            Object.keys(item).forEach(function(k) {
                return copy3[k] = _cloneDeep(item[k]);
            });
            return copy3;
        }
        throw new Error("Unable to copy object: ".concat(item));
    }(obj);
}


var $c53c9d43678cab83$export$2e2bcd8739ae039 = /*#__PURE__*/ function() {
    "use strict";
    function Block() {
        var tag = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "div", propsAndChildren = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, Block);
        var ref = this.getChildren(propsAndChildren), children = ref.children, childrenArray = ref.childrenArray, props = ref.props;
        this._eventBus = new (0, $58a4a026fea3588f$export$2e2bcd8739ae039)();
        this._id = (0, $497149f04afaff89$export$2e2bcd8739ae039)();
        this._children = this.makePropsProxy(children);
        this._childrenArray = this.makePropsProxy(childrenArray);
        this._props = this.makePropsProxy((0, $97b82bb5d9a0e537$export$2e2bcd8739ae039)((0, $cdc126d7edb6db3b$export$2e2bcd8739ae039)({}, props), {
            _id: this._id
        }));
        this._meta = {
            tag: tag,
            props: props
        };
        this.registerEvents();
        this._eventBus.emit(Block.EVENTS.INIT);
    }
    (0, $37aec4d01f6984fa$export$2e2bcd8739ae039)(Block, [
        {
            key: "getChildren",
            value: function getChildren(propsAndChildren) {
                var children = {};
                var childrenArray = {};
                var props = {};
                Object.keys(propsAndChildren).forEach(function(key) {
                    var value = propsAndChildren[key];
                    if ((0, $fd9f47336095cd04$export$2e2bcd8739ae039)(value)) children[key] = value;
                    else if ((0, $1aa9c0abde2b3cbc$export$2e2bcd8739ae039)(value)) childrenArray[key] = value;
                    else props[key] = value;
                });
                return {
                    children: children,
                    childrenArray: childrenArray,
                    props: props
                };
            }
        },
        {
            key: "addAttribute",
            value: function addAttribute() {
                var _this = this;
                var __props = this._props, _attr = __props.attr, attr = _attr === void 0 ? {} : _attr;
                Object.entries(attr).forEach(function(param) {
                    var _param = (0, $e45e0bb52c6ee4f1$export$2e2bcd8739ae039)(param, 2), key = _param[0], value = _param[1];
                    _this._element.setAttribute(key, value);
                });
            }
        },
        {
            key: "addEvents",
            value: function addEvents() {
                var _this = this;
                var __props = this._props, _events = __props.events, events = _events === void 0 ? {} : _events;
                Object.keys(events).forEach(function(eventName) {
                    _this._element.addEventListener(eventName, events[eventName]);
                });
            }
        },
        {
            key: "removeEvents",
            value: function removeEvents() {
                var _this = this;
                var __props = this._props, _events = __props.events, events = _events === void 0 ? {} : _events;
                Object.keys(events).forEach(function(eventName) {
                    _this._element.removeEventListener(eventName, events[eventName]);
                });
            }
        },
        {
            key: "registerEvents",
            value: function registerEvents() {
                this._eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
                this._eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
                this._eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
                this._eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
            }
        },
        {
            key: "init",
            value: function init() {
                this._element = this.createDocumentElement(this._meta.tag);
                this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
            }
        },
        {
            key: "_componentDidMount",
            value: function _componentDidMount() {
                this.componentDidMount();
                Object.values(this._children).forEach(function(child) {
                    child.dispatchComponentDidMount();
                });
                Object.values(this._childrenArray).forEach(function(childrenArrayRecord) {
                    return childrenArrayRecord.forEach(function(child) {
                        child.dispatchComponentDidMount();
                    });
                });
            }
        },
        {
            key: "componentDidMount",
            value: function componentDidMount() {}
        },
        {
            key: "dispatchComponentDidMount",
            value: function dispatchComponentDidMount() {
                this._eventBus.emit(Block.EVENTS.FLOW_CDM);
                if (Object.keys(this._children).length || Object.keys(this._childrenArray).length) this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
            }
        },
        {
            key: "_componentDidUpdate",
            value: function _componentDidUpdate(oldProps, newProps) {
                // console.log('here render')
                var isReRender = this.componentDidUpdate(oldProps, newProps);
                if (isReRender) this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
            }
        },
        {
            key: "componentDidUpdate",
            value: function componentDidUpdate(oldProps, newProps) {
                console.log("CDU");
                console.log(oldProps, newProps);
            // if (!isEqual(oldProps, newProps)) {
            //   this._props = newProps
            //   return true
            // };
            }
        },
        {
            key: "setProps",
            value: function setProps(newProps) {
                if (!newProps) return;
                var ref = this.getChildren(newProps), children = ref.children, childrenArray = ref.childrenArray, props = ref.props;
                if (Object.values(children).length) Object.assign(this._children, children);
                if (Object.values(childrenArray).length) Object.assign(this._childrenArray, children);
                if (Object.values(props).length) {
                    console.log("new props");
                    Object.assign(this._props, props);
                }
            }
        },
        {
            key: "_render",
            value: function _render() {
                var block = this.render();
                this.removeEvents();
                this._element.innerHTML = "";
                if (block) {
                    this._element.appendChild(block);
                    this.addEvents();
                    this.addAttribute();
                }
            }
        },
        {
            key: "render",
            value: function render() {}
        },
        {
            key: "getContent",
            value: function getContent() {
                return this._element;
            }
        },
        {
            key: "makePropsProxy",
            value: function makePropsProxy(props) {
                var _this = this;
                return new Proxy(props, {
                    get: function(target, prop) {
                        var value = target[prop];
                        return typeof value === "function" ? value.bind(target) : value;
                    },
                    set: function(target, prop, value) {
                        var oldTarget = (0, $44a8176be4e63a6c$export$629a2bd3f5a49ecc)(target);
                        // target[prop as string] = value;
                        target = value;
                        // console.log(oldTarget)
                        // console.log(target)
                        _this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                        return true;
                    }
                });
            }
        },
        {
            key: "createDocumentElement",
            value: function createDocumentElement(tag) {
                var ref;
                var element = document.createElement(tag);
                if ((ref = this._props.setting) === null || ref === void 0 ? void 0 : ref.withInternalID) element.setAttribute("data-id", this._id);
                return element;
            }
        },
        {
            key: "show",
            value: function show() {
                console.log("Block-show");
                this.getContent().style.display = "block";
            }
        },
        {
            key: "hide",
            value: function hide() {
                this.getContent().remove();
            }
        },
        {
            key: "compile",
            value: function compile(template, props) {
                if (typeof props === "undefined") props = this._props;
                var propsAndStubs = (0, $cdc126d7edb6db3b$export$2e2bcd8739ae039)({}, props);
                Object.entries(this._children).forEach(function(param) {
                    var _param = (0, $e45e0bb52c6ee4f1$export$2e2bcd8739ae039)(param, 2), key = _param[0], child = _param[1];
                    propsAndStubs[key] = '<div data-id="'.concat(child._id, '"></div>');
                });
                Object.entries(this._childrenArray).forEach(function(param) {
                    var _param = (0, $e45e0bb52c6ee4f1$export$2e2bcd8739ae039)(param, 2), key = _param[0], childArray = _param[1];
                    propsAndStubs[key] = childArray.reduce(function(previousValue, child) {
                        return previousValue += '<div data-id="'.concat(child._id, '"></div>');
                    }, "");
                });
                var fragment = this.createDocumentElement("template");
                fragment.innerHTML = (0, (/*@__PURE__*/$parcel$interopDefault($e0b8ee1f151445ce$exports))).compile(template)(propsAndStubs);
                Object.values(this._children).forEach(function(child) {
                    var stub = fragment.content.querySelector('[data-id="'.concat(child._id, '"]'));
                    if (stub) stub.replaceWith(child.getContent());
                });
                Object.values(this._childrenArray).forEach(function(childArrays) {
                    return childArrays.forEach(function(child) {
                        var stub = fragment.content.querySelector('[data-id="'.concat(child._id, '"]'));
                        if (stub) stub.replaceWith(child.getContent());
                    });
                });
                return fragment.content;
            }
        }
    ]);
    return Block;
}();
(0, $f32bfd8434ef5009$export$2e2bcd8739ae039)($c53c9d43678cab83$export$2e2bcd8739ae039, "EVENTS", {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
});


var $62751d5f23ea729c$export$2e2bcd8739ae039 = /*#__PURE__*/ function(Block) {
    "use strict";
    (0, $5e1436f3cfc25af7$export$2e2bcd8739ae039)(Inputs, Block);
    var _super = (0, $70223088e8354a4f$export$2e2bcd8739ae039)(Inputs);
    function Inputs() {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, Inputs);
        return _super.apply(this, arguments);
    }
    (0, $37aec4d01f6984fa$export$2e2bcd8739ae039)(Inputs, [
        {
            key: "render",
            value: function render() {
                return this.compile((0, $6e579df1fe915be1$export$2e2bcd8739ae039));
            }
        }
    ]);
    return Inputs;
}((0, $c53c9d43678cab83$export$2e2bcd8739ae039));






var $eb5bc3b19e4d243f$var$template = '\n{{#each items}}\n<a href="{{url}}" class="{{class}}">{{title}}</a>\n{{/each}}\n';
var $eb5bc3b19e4d243f$export$2e2bcd8739ae039 = $eb5bc3b19e4d243f$var$template;



var $c0f60909d709bd2e$export$2e2bcd8739ae039 = /*#__PURE__*/ function(Block) {
    "use strict";
    (0, $5e1436f3cfc25af7$export$2e2bcd8739ae039)(Links, Block);
    var _super = (0, $70223088e8354a4f$export$2e2bcd8739ae039)(Links);
    function Links() {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, Links);
        return _super.apply(this, arguments);
    }
    (0, $37aec4d01f6984fa$export$2e2bcd8739ae039)(Links, [
        {
            key: "render",
            value: function render() {
                return this.compile((0, $eb5bc3b19e4d243f$export$2e2bcd8739ae039));
            }
        }
    ]);
    return Links;
}((0, $c53c9d43678cab83$export$2e2bcd8739ae039));






var $853593cc6865c71f$var$template = '\n<h2 class="title auth__title">{{{ title }}}</h2>\n{{{inputs}}}\n{{{buttons}}}\n{{{links}}}\n';
var $853593cc6865c71f$export$2e2bcd8739ae039 = $853593cc6865c71f$var$template;



var $a1f90209ac97a615$export$2e2bcd8739ae039 = /*#__PURE__*/ function(Block) {
    "use strict";
    (0, $5e1436f3cfc25af7$export$2e2bcd8739ae039)(Auth, Block);
    var _super = (0, $70223088e8354a4f$export$2e2bcd8739ae039)(Auth);
    function Auth() {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, Auth);
        return _super.apply(this, arguments);
    }
    (0, $37aec4d01f6984fa$export$2e2bcd8739ae039)(Auth, [
        {
            key: "render",
            value: function render() {
                return this.compile((0, $853593cc6865c71f$export$2e2bcd8739ae039));
            }
        }
    ]);
    return Auth;
}((0, $c53c9d43678cab83$export$2e2bcd8739ae039));


var $286380eeb72f867a$var$View = {
    showError: function(evt, message) {
        if (evt instanceof Element) evt.nextSibling.textContent = message;
        else evt.target.nextSibling.textContent = message;
    },
    hideError: function(evt) {
        if (evt instanceof Element) evt.nextSibling.textContent = "";
        else evt.target.nextSibling.textContent = "";
    }
};
var $286380eeb72f867a$export$2e2bcd8739ae039 = $286380eeb72f867a$var$View;


function $37e61cf22ec1158b$export$2e2bcd8739ae039(evt) {
    var value;
    var target;
    if (evt instanceof Element) {
        value = evt.value;
        target = evt;
    } else {
        value = evt.target.value;
        target = evt.target;
    }
    var message = "";
    if (target.id === "first_name" || target.id === "second_name") {
        if (!value.match(/^[A-ZА-Я]/g)) message = "С заглавной";
        else if (value.length < 3) message = "от 3 символов";
        else if (value.match(/\d+/g)) message = "без цифр";
        else if (value.match(/\s/g)) message = "без пробела";
        else if (!value.match(/^[a-zA-ZА-Яа-я0-9-]{0,}$/g)) message = "специальные символы не допускаются";
    }
    if (target.id === "login" || target.id === "auth_login") {
        if (value.length === 0) message = "Не может быть пустым";
        else if (value.length < 3) message = "от 3 символов";
        else if (!value.match(/^[a-zA-Z0-9-_]/g)) message = "только латинские";
        else if (value.length > 20) message = "не больше 20 символов";
        else if (!value.match(/[a-zA-Zа-я]+/g)) message = "мимимум 1 символ";
        else if (value.match(/\s/g)) message = "без пробела";
        else if (!value.match(/^[a-zA-Z0-9-_]{3,20}$/g)) message = "специальные символы не допускаются";
    }
    if (target.id === "email") {
        if (value.length < 3) message = "от 3 символов";
        else if (value.match(/\s/g)) message = "без пробела";
        else if (!value.match(/^[a-zA-Z0-9-_]/g)) message = "только латинские";
        else if (!value.match(/^[a-zA-Z0-9-_@.]{0,}$/g)) message = "специальные символы не допускаются";
        else if (!value.match(/[@]/g)) message = "не забудьте @";
        else if (!value.match(/[.]/g)) message = "нет точки в почте";
        else if (value.match(/[.]/g) && !value.match(/\w+[.]\w+/g)) message = "это не почта";
    }
    if (target.id === "password" || target.id === "auth_pass" || target.id === "password_new") {
        if (!value.match(/^[a-zA-Z0-9-_]/g)) message = "только латинские";
        else if (value.length > 40) message = "не больше 40 символов";
        else if (!value.match(/\d+/g)) message = "хотя бы одну цифра";
        else if (!value.match(/[A-ZА-Я]+/g)) message = "хотя бы заглавную букву";
        else if (value.length < 8) message = "от 8 символов";
    }
    if (target.id === "phone") {
        if (!value.match(/^[0-9+]/g)) message = "начинается с плюса или цифры";
        else if (!value.match(/\d+/g)) message = "хотя бы одну цифра";
        else if (value.length < 10) message = "Номер телефона должен содержать от 10 символов";
        else if (value.match(/\s/g)) message = "Номер телефона не может содержать пробелы";
        else if (value.match(/[A-Za-zА-Яа-я]+/g)) message = "Номер телефона не может содержать буквы";
        else if (value.length > 15) message = "Номер телефона должен содержать до 15 символов";
    }
    return message;
}


function $21d6ba3a445ba2d6$export$2e2bcd8739ae039(target) {
    var message = "";
    var value = target.value;
    if (target.id === "first_name" || target.id === "second_name") {
        if (!value.match(/^[A-ZА-Я]/g)) message = "С заглавной";
        else if (value.length < 3) message = "от 3 символов";
        else if (value.match(/\d+/g)) message = "без цифр";
        else if (value.match(/\s/g)) message = "без пробела";
        else if (!value.match(/^[a-zA-ZА-Яа-я0-9-]{0,}$/g)) message = "специальные символы не допускаются";
    }
    if (target.id === "login") {
        if (value.length === 0) message = "Не может быть пустым";
        else if (value.length < 3) message = "от 3 символов";
        else if (!value.match(/^[a-zA-Z0-9-_]/g)) message = "только латинские";
        else if (value.length > 20) message = "не больше 20 символов";
        else if (!value.match(/[a-zA-Zа-я]+/g)) message = "мимимум 1 символ";
        else if (value.match(/\s/g)) message = "без пробела";
        else if (!value.match(/^[a-zA-Z0-9-_]{3,20}$/g)) message = "специальные символы не допускаются";
    }
    if (target.id === "email") {
        if (value.length < 3) message = "от 3 символов";
        else if (value.match(/\s/g)) message = "без пробела";
        else if (!value.match(/^[a-zA-Z0-9-_]/g)) message = "только латинские";
        else if (!value.match(/^[a-zA-Z0-9-_@.]{0,}$/g)) message = "специальные символы не допускаются";
        else if (!value.match(/[@]/g)) message = "не забудьте @";
        else if (!value.match(/[.]/g)) message = "нет точки в почте";
        else if (value.match(/[.]/g) && !value.match(/\w+[.]\w+/g)) message = "это не почта";
    }
    if (target.id === "password") {
        if (!value.match(/^[a-zA-Z0-9-_]/g)) message = "только латинские";
        else if (value.length > 40) message = "не больше 40 символов";
        else if (!value.match(/\d+/g)) message = "хотя бы одну цифра";
        else if (!value.match(/[A-ZА-Я]+/g)) message = "хотя бы заглавную букву";
        else if (value.length < 8) message = "от 8 символов";
    }
    if (target.id === "phone") {
        if (!value.match(/^[0-9+]/g)) message = "начинается с плюса или цифры";
        else if (!value.match(/\d+/g)) message = "хотя бы одну цифра";
        else if (value.length < 10) message = "Номер телефона должен содержать от 10 символов";
        else if (value.match(/\s/g)) message = "Номер телефона не может содержать пробелы";
        else if (value.match(/[A-Za-zА-Яа-я]+/g)) message = "Номер телефона не может содержать буквы";
        else if (value.length > 15) message = "Номер телефона должен содержать до 15 символов";
    }
    return message;
}



var $eb2b7b7cbe4465f0$var$Controller = {
    // sendConsole(): any {
    //   document.querySelectorAll('INPUT').forEach((item: Element) => void {
    //     console.log((item as HTMLInputElement).value)
    //   })
    // },
    onValidate: function(evt) {
        evt.preventDefault();
        if ((0, $37e61cf22ec1158b$export$2e2bcd8739ae039)(evt)) (0, $286380eeb72f867a$export$2e2bcd8739ae039).showError(evt, (0, $37e61cf22ec1158b$export$2e2bcd8739ae039)(evt));
        else (0, $286380eeb72f867a$export$2e2bcd8739ae039).hideError(evt);
    },
    onSubmit: function(evt) {
        evt.preventDefault();
        var inputs = document.querySelectorAll("INPUT");
        inputs.forEach(function(input) {
            if ((0, $21d6ba3a445ba2d6$export$2e2bcd8739ae039)(input)) {
                (0, $286380eeb72f867a$export$2e2bcd8739ae039).showError(input, (0, $37e61cf22ec1158b$export$2e2bcd8739ae039)(input));
                return;
            }
            return true;
        });
    },
    onGo: function(evt) {
        evt.preventDefault();
        (0, $4e72b501f709fb5a$export$2e2bcd8739ae039).go(evt.target.href.split("*")[1]);
    }
};
var $eb2b7b7cbe4465f0$export$cc5dae9a911bfe2 = function(evt) {
    return $eb2b7b7cbe4465f0$var$Controller.onValidate(evt);
};
var $eb2b7b7cbe4465f0$export$4ce568c1357045cd = function(evt) {
    return $eb2b7b7cbe4465f0$var$Controller.onSubmit(evt);
};
var $eb2b7b7cbe4465f0$export$75a0fd467e704b5c = function(evt) {
    return $eb2b7b7cbe4465f0$var$Controller.onGo(evt);
};







function $e83b0d2deeb4dcc6$var$isPlainObject(value) {
    return typeof value === "object" && value !== null && value.constructor === Object && Object.prototype.toString.call(value) === "[object Object]";
}
function $e83b0d2deeb4dcc6$var$isArray(value) {
    return Array.isArray(value);
}
function $e83b0d2deeb4dcc6$var$isArrayOrObject(value) {
    return $e83b0d2deeb4dcc6$var$isPlainObject(value) || $e83b0d2deeb4dcc6$var$isArray(value);
}
function $e83b0d2deeb4dcc6$var$isEqual(lhs, rhs) {
    if (Object.keys(lhs).length !== Object.keys(rhs).length) return false;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = Object.entries(lhs)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _value = (0, $e45e0bb52c6ee4f1$export$2e2bcd8739ae039)(_step.value, 2), key = _value[0], value = _value[1];
            var rightValue = rhs[key];
            if ($e83b0d2deeb4dcc6$var$isArrayOrObject(value) && $e83b0d2deeb4dcc6$var$isArrayOrObject(rightValue)) {
                if ($e83b0d2deeb4dcc6$var$isEqual(value, rightValue)) continue;
                return false;
            }
            if (value !== rightValue) return false;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    return true;
}
var $e83b0d2deeb4dcc6$export$2e2bcd8739ae039 = $e83b0d2deeb4dcc6$var$isEqual;


function $2f0ec4092c52228e$export$2e2bcd8739ae039(query, block) {
    var root = document.querySelector(query);
    if (!root) return null;
    var content = block.getContent();
    root.appendChild(content);
    block.dispatchComponentDidMount();
    return root;
}


var $2e16111c34ee6c04$export$2e2bcd8739ae039 = /*#__PURE__*/ function() {
    "use strict";
    function Route(pathname, view, props) {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, Route);
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }
    (0, $37aec4d01f6984fa$export$2e2bcd8739ae039)(Route, [
        {
            key: "navigate",
            value: function navigate(pathname) {
                if (this.match(pathname)) {
                    this._pathname = pathname;
                    this.render();
                }
            }
        },
        {
            key: "leave",
            value: function leave() {
                if (this._block) this._block.hide();
            }
        },
        {
            key: "match",
            value: function match(pathname) {
                return (0, $e83b0d2deeb4dcc6$export$2e2bcd8739ae039)(pathname, this._pathname);
            }
        },
        {
            key: "render",
            value: function render() {
                if (!this._block) {
                    this._block = new this._blockClass();
                    (0, $2f0ec4092c52228e$export$2e2bcd8739ae039)(this._props.rootQuery, this._block);
                    return;
                }
                (0, $2f0ec4092c52228e$export$2e2bcd8739ae039)(this._props.rootQuery, this._block);
            }
        }
    ]);
    return Route;
}();


var $df846e91fade512b$export$2e2bcd8739ae039 = /*#__PURE__*/ function() {
    "use strict";
    function Router(rootQuery) {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, Router);
        if (Router.__instance) return Router.__instance;
        this.routes = [];
        this.pathes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
        Router.__instance = this;
    }
    (0, $37aec4d01f6984fa$export$2e2bcd8739ae039)(Router, [
        {
            key: "use",
            value: function use(pathname, block, state) {
                if (!state) {
                    var route = new (0, $2e16111c34ee6c04$export$2e2bcd8739ae039)(pathname, block, {
                        rootQuery: this._rootQuery
                    });
                    // console.log(rootQuery)
                    this.routes.push(route);
                    this.routes.push(route);
                    return this;
                }
            }
        },
        {
            key: "start",
            value: function start() {
                var _this = this;
                window.onpopstate = (function(event) {
                    console.log(11111);
                    _this._onRoute(event.currentTarget.location.pathname);
                }).bind(this);
                this._onRoute(window.location.pathname);
            }
        },
        {
            key: "_onRoute",
            value: function _onRoute(pathname) {
                var route = this.getRoute(pathname);
                if (this._currentRoute && this._currentRoute != route) this._currentRoute.leave();
                this._currentRoute = route;
                route.render(route, pathname);
            }
        },
        {
            key: "go",
            value: function go(pathname) {
                this.history.pushState({}, "", pathname);
                this._onRoute(pathname);
            }
        },
        {
            key: "back",
            value: function back() {
                this.history.back();
            }
        },
        {
            key: "forward",
            value: function forward() {
                this.history.forward();
            }
        },
        {
            key: "getRoute",
            value: function getRoute(pathname) {
                return this.routes.find(function(route) {
                    return route.match(pathname);
                });
            }
        }
    ]);
    return Router;
}();










function $2d26d8c08c9516fc$var$merge(lhs, rhs) {
    for(var p in rhs){
        if (!rhs.hasOwnProperty(p)) continue;
        try {
            if (rhs[p].constructor === Object) rhs[p] = $2d26d8c08c9516fc$var$merge(lhs[p], rhs[p]);
            else lhs[p] = rhs[p];
        } catch (e) {
            lhs[p] = rhs[p];
        }
    }
    return lhs;
}
var $2d26d8c08c9516fc$export$2e2bcd8739ae039 = $2d26d8c08c9516fc$var$merge;


function $f4f409d9783496e2$var$set(object, path, value) {
    if (typeof object !== "object" || object === null) return object;
    if (typeof path !== "string") throw new Error("path must be string");
    var result = path.split(".").reduceRight(function(acc, key) {
        return (0, $f32bfd8434ef5009$export$2e2bcd8739ae039)({}, key, acc);
    }, value);
    return (0, $2d26d8c08c9516fc$export$2e2bcd8739ae039)(object, result);
}
var $f4f409d9783496e2$export$2e2bcd8739ae039 = $f4f409d9783496e2$var$set;


var $535ec53cbbbf8fb5$export$84bc128a772952e2;
(function(StoreEvents) {
    StoreEvents["Updated"] = "updated";
})($535ec53cbbbf8fb5$export$84bc128a772952e2 || ($535ec53cbbbf8fb5$export$84bc128a772952e2 = {}));
var $535ec53cbbbf8fb5$export$2e2bcd8739ae039 = /*#__PURE__*/ function(EventBus) {
    "use strict";
    (0, $5e1436f3cfc25af7$export$2e2bcd8739ae039)(Store, EventBus);
    var _super = (0, $70223088e8354a4f$export$2e2bcd8739ae039)(Store);
    function Store() {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, Store);
        var _this;
        _this = _super.apply(this, arguments);
        (0, $f32bfd8434ef5009$export$2e2bcd8739ae039)((0, $74313629dd869dbc$export$2e2bcd8739ae039)(_this), "state", {});
        return _this;
    }
    (0, $37aec4d01f6984fa$export$2e2bcd8739ae039)(Store, [
        {
            key: "getState",
            value: function getState() {
                return this.state;
            }
        },
        {
            key: "set",
            value: function set1(path, value) {
                var storeResult = (0, $f4f409d9783496e2$export$2e2bcd8739ae039)(this.state, path, value);
                this.emit($535ec53cbbbf8fb5$export$84bc128a772952e2.Updated);
                return storeResult;
            }
        }
    ]);
    return Store;
}((0, $58a4a026fea3588f$export$2e2bcd8739ae039));
console.log("store module");
var $535ec53cbbbf8fb5$var$store = new $535ec53cbbbf8fb5$export$2e2bcd8739ae039();
var // store.set('chats', {
//   items: {
//     id: 1000,
//     title: 'No Chats'
//   }
// })
// store.set('messages', {
//   items: [{
//     date: '12.10.22 08:30',
//     text: 'Hi there',
//     class: 'messages__item--user',
//   }, {
//     date: '12.10.22 08:30',
//     text: 'Hi',
//     class: 'messages__item--opponent',
//   }, {
//     date: '12.10.22 08:30',
//     text: 'How are you',
//     class: 'messages__item--user',
//   },
//   ],
//   attr: {
//     class: 'messages',
//   },
// });
$535ec53cbbbf8fb5$export$2e2bcd8739ae039 // set(state, 'user.name', 'John');
 // console.log(state); // { user: { name: 'John' } }
 = $535ec53cbbbf8fb5$var$store;











var $49a98192c0c15747$var$template = '\n<div class="main__chat">\n  <div class="chat">\n    <ul class="chat__list">\n      {{#each items}}\n        <li class="chat__item" data-id="{{id}}">\n          <div class="chat__wrapper">\n              <h3 class="chat__name">{{title}}</h3>\n              <span class="chat__date">{{id}}</span>\n          </div>\n          <p class="chat__message">{{created_by}}</p>\n          <button class="plus">+</button>\n        </li>\n      {{/each}}\n    </ul>\n  </div>\n</div>';
var $49a98192c0c15747$export$2e2bcd8739ae039 = $49a98192c0c15747$var$template;








function $e00d4bcc5e2dae50$var$connect(mapStateToProps) {
    return function(Component) {
        return /*#__PURE__*/ function(Component) {
            "use strict";
            (0, $5e1436f3cfc25af7$export$2e2bcd8739ae039)(_class, Component);
            var _super = (0, $70223088e8354a4f$export$2e2bcd8739ae039)(_class);
            function _class(props) {
                (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, _class);
                var _this;
                console.log("попали в конструктор");
                _this = _super.call(this, "div", (0, $cdc126d7edb6db3b$export$2e2bcd8739ae039)({}, props, mapStateToProps((0, $535ec53cbbbf8fb5$export$2e2bcd8739ae039).getState())));
                (0, $535ec53cbbbf8fb5$export$2e2bcd8739ae039).on((0, $535ec53cbbbf8fb5$export$84bc128a772952e2).Updated, function() {
                    _this.setProps((0, $cdc126d7edb6db3b$export$2e2bcd8739ae039)({}, mapStateToProps((0, $535ec53cbbbf8fb5$export$2e2bcd8739ae039).getState())));
                });
                return _this;
            }
            return _class;
        }(Component);
    };
}
var $e00d4bcc5e2dae50$export$2e2bcd8739ae039 = $e00d4bcc5e2dae50$var$connect;


var $9b62beb2a57aab2e$var$Chats = /*#__PURE__*/ function(Block) {
    "use strict";
    (0, $5e1436f3cfc25af7$export$2e2bcd8739ae039)(Chats, Block);
    var _super = (0, $70223088e8354a4f$export$2e2bcd8739ae039)(Chats);
    function Chats() {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, Chats);
        return _super.apply(this, arguments);
    }
    (0, $37aec4d01f6984fa$export$2e2bcd8739ae039)(Chats, [
        {
            key: "render",
            value: function render() {
                return this.compile((0, $49a98192c0c15747$export$2e2bcd8739ae039));
            }
        }
    ]);
    return Chats;
}((0, $c53c9d43678cab83$export$2e2bcd8739ae039));
var $9b62beb2a57aab2e$var$chatsWithStore = (0, $e00d4bcc5e2dae50$export$2e2bcd8739ae039)(function(state) {
    return {
        chats: state.chats
    };
});
var $9b62beb2a57aab2e$export$2e2bcd8739ae039 // export default Chats
 = $9b62beb2a57aab2e$var$chatsWithStore($9b62beb2a57aab2e$var$Chats);







var $8769e54d3de39ee1$var$template = '\n    <ul class="messages__list">\n      {{#each items}}\n      <li class="messages__item">\n        <span class="messages__date">{{time}}</span>\n        <p class="messages__text">{{content}}</p>\n      </li>\n      {{/each}}\n    </ul>';
var $8769e54d3de39ee1$export$2e2bcd8739ae039 = $8769e54d3de39ee1$var$template;




var $100296d85c255ba2$var$Messages = /*#__PURE__*/ function(Block) {
    "use strict";
    (0, $5e1436f3cfc25af7$export$2e2bcd8739ae039)(Messages, Block);
    var _super = (0, $70223088e8354a4f$export$2e2bcd8739ae039)(Messages);
    function Messages() {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, Messages);
        return _super.apply(this, arguments);
    }
    (0, $37aec4d01f6984fa$export$2e2bcd8739ae039)(Messages, [
        {
            key: "render",
            value: function render() {
                return this.compile((0, $8769e54d3de39ee1$export$2e2bcd8739ae039));
            }
        }
    ]);
    return Messages;
}((0, $c53c9d43678cab83$export$2e2bcd8739ae039));
var $100296d85c255ba2$var$messagesWithStore = (0, $e00d4bcc5e2dae50$export$2e2bcd8739ae039)(function(state) {
    return {
        messages: state.messages
    };
});
var $100296d85c255ba2$export$2e2bcd8739ae039 = $100296d85c255ba2$var$messagesWithStore($100296d85c255ba2$var$Messages);






var $855608befe210bf9$var$template = "\n<div class='main__chat-wrapper'>\n{{{logout}}}\n{{{settings}}}\n{{{form}}}\n{{{getChats}}}\n{{{chats}}}\n</div>\n<div class='main__messages-wrapper'>\n{{{messages}}}\n{{{formMessages}}}\n</div>\n<div class=\"modal modal--nodisplay\">\n<div class=\"modal__content\"\n  {{{modalAdd}}}\n</div>\n</div>\n";
var $855608befe210bf9$export$2e2bcd8739ae039 = $855608befe210bf9$var$template;



var $0e46deb844cb029b$var$Chat = /*#__PURE__*/ function(Block) {
    "use strict";
    (0, $5e1436f3cfc25af7$export$2e2bcd8739ae039)(Chat, Block);
    var _super = (0, $70223088e8354a4f$export$2e2bcd8739ae039)(Chat);
    function Chat() {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, Chat);
        return _super.apply(this, arguments);
    }
    (0, $37aec4d01f6984fa$export$2e2bcd8739ae039)(Chat, [
        {
            key: "render",
            value: function render() {
                return this.compile((0, $855608befe210bf9$export$2e2bcd8739ae039));
            }
        }
    ]);
    return Chat;
}((0, $c53c9d43678cab83$export$2e2bcd8739ae039));
var $0e46deb844cb029b$export$2e2bcd8739ae039 = $0e46deb844cb029b$var$Chat;







var $a9fec9bbbdceb392$var$template = '\n{{#each items}}\n<button class="{{class}}" type="{{type}}">{{title}}</button>\n{{/each}}\n';
var $a9fec9bbbdceb392$export$2e2bcd8739ae039 = $a9fec9bbbdceb392$var$template;



var $206e8296db5148b7$export$2e2bcd8739ae039 = /*#__PURE__*/ function(Block) {
    "use strict";
    (0, $5e1436f3cfc25af7$export$2e2bcd8739ae039)(Buttons, Block);
    var _super = (0, $70223088e8354a4f$export$2e2bcd8739ae039)(Buttons);
    function Buttons() {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, Buttons);
        return _super.apply(this, arguments);
    }
    (0, $37aec4d01f6984fa$export$2e2bcd8739ae039)(Buttons, [
        {
            key: "render",
            value: function render() {
                return this.compile((0, $a9fec9bbbdceb392$export$2e2bcd8739ae039));
            }
        }
    ]);
    return Buttons;
}((0, $c53c9d43678cab83$export$2e2bcd8739ae039));













var $107da7d0a72a9927$var$METHODS;
(function(METHODS) {
    METHODS["GET"] = "GET";
    METHODS["POST"] = "POST";
    METHODS["PUT"] = "PUT";
    METHODS["PATCH"] = "PATCH";
    METHODS["DELETE"] = "DELETE";
})($107da7d0a72a9927$var$METHODS || ($107da7d0a72a9927$var$METHODS = {}));
var $107da7d0a72a9927$var$baseUrl = "https://ya-praktikum.tech/api/v2";
var $107da7d0a72a9927$export$5767f363d4830f89 = /*#__PURE__*/ function() {
    "use strict";
    function HTTPTransport() {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, HTTPTransport);
    }
    (0, $37aec4d01f6984fa$export$2e2bcd8739ae039)(HTTPTransport, [
        {
            key: "get",
            value: function get(url, data) {
                var _this = this;
                return (0, $28fbde635bea944d$export$2e2bcd8739ae039)((0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).mark(function _callee() {
                    return (0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                return _ctx.abrupt("return", _this.request(url, {
                                    method: $107da7d0a72a9927$var$METHODS.GET,
                                    data: data
                                }));
                            case 1:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        },
        {
            key: "post",
            value: function post(url, data) {
                var _this = this;
                return (0, $28fbde635bea944d$export$2e2bcd8739ae039)((0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).mark(function _callee() {
                    return (0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                return _ctx.abrupt("return", _this.request(url, {
                                    method: $107da7d0a72a9927$var$METHODS.POST,
                                    data: data
                                }));
                            case 1:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        },
        {
            key: "put",
            value: function put(url, data) {
                var _this = this;
                return (0, $28fbde635bea944d$export$2e2bcd8739ae039)((0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).mark(function _callee() {
                    return (0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                return _ctx.abrupt("return", _this.request(url, {
                                    method: $107da7d0a72a9927$var$METHODS.PUT,
                                    data: data
                                }));
                            case 1:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        },
        {
            key: "delete",
            value: function _delete(url, data) {
                var _this = this;
                return (0, $28fbde635bea944d$export$2e2bcd8739ae039)((0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).mark(function _callee() {
                    return (0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                return _ctx.abrupt("return", _this.request(url, {
                                    method: $107da7d0a72a9927$var$METHODS.DELETE,
                                    data: data
                                }));
                            case 1:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        },
        {
            key: "request",
            value: function request(url) {
                var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                    method: $107da7d0a72a9927$var$METHODS.GET
                };
                return (0, $28fbde635bea944d$export$2e2bcd8739ae039)((0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).mark(function _callee() {
                    return (0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                return _ctx.abrupt("return", new Promise(function(resolve, reject) {
                                    var method = options.method, data = options.data;
                                    var xhr = new XMLHttpRequest();
                                    if (method === $107da7d0a72a9927$var$METHODS.GET) {
                                        if (data) url = "".concat(url, "?").concat(Object.entries(data).map(function(param) {
                                            var _param = (0, $e45e0bb52c6ee4f1$export$2e2bcd8739ae039)(param, 2), key = _param[0], value = _param[1];
                                            return "".concat(key, "=").concat(value);
                                        }).join("&"));
                                    }
                                    xhr.open(method, $107da7d0a72a9927$var$baseUrl + url);
                                    xhr.withCredentials = true;
                                    xhr.onload = function() {
                                        var ref;
                                        var resp;
                                        if (~((ref = xhr === null || xhr === void 0 ? void 0 : xhr.getResponseHeader("Content-Type")) === null || ref === void 0 ? void 0 : ref.indexOf("application/json"))) resp = JSON.parse(xhr.response);
                                        else resp = xhr.response;
                                        if (xhr.status === 200) resolve(resp);
                                        else reject(resp);
                                    };
                                    xhr.onabort = reject;
                                    xhr.onerror = reject;
                                    xhr.ontimeout = reject;
                                    if (method === $107da7d0a72a9927$var$METHODS.GET || !data) {
                                        console.log("get");
                                        xhr.send();
                                    } else if (data instanceof FormData) {
                                        console.log("formData");
                                        xhr.send(data);
                                    } else {
                                        console.log("objectXML");
                                        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                                        xhr.send(JSON.stringify(data));
                                    }
                                }));
                            case 1:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        }
    ]);
    return HTTPTransport;
}();
var $107da7d0a72a9927$export$2e2bcd8739ae039 = $107da7d0a72a9927$export$5767f363d4830f89;


var $49e027c9bfb172ec$var$route = new (0, $107da7d0a72a9927$export$2e2bcd8739ae039)();
var $49e027c9bfb172ec$export$d0ab14f573b22290 = /*#__PURE__*/ function() {
    "use strict";
    function ChatAPI() {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, ChatAPI);
        this.http = new (0, $107da7d0a72a9927$export$2e2bcd8739ae039)();
    }
    (0, $37aec4d01f6984fa$export$2e2bcd8739ae039)(ChatAPI, [
        {
            key: "create",
            value: function create(data) {
                return this.http.post("/chats", data);
            }
        },
        {
            key: "addUser",
            value: function addUser(data) {
                return this.http.put("/chats/users", data);
            }
        },
        {
            key: "getToken",
            value: function getToken(data) {
                return this.http.post("/chats/token/".concat(data));
            }
        },
        {
            key: "removeUser",
            value: function removeUser(data) {
                return this.http["delete"]("/chats/users", data);
            }
        },
        {
            key: "logout",
            value: function logout() {
                return this.http.post("/auth/logout");
            }
        },
        {
            key: "getchats",
            value: function getchats() {
                return this.http.get("/chats");
            }
        }
    ]);
    return ChatAPI;
}();


var $0b6d8ac63988e58c$var$ChatController = /*#__PURE__*/ function() {
    "use strict";
    function ChatController() {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, ChatController);
        this.api = new (0, $49e027c9bfb172ec$export$d0ab14f573b22290)();
    }
    (0, $37aec4d01f6984fa$export$2e2bcd8739ae039)(ChatController, [
        {
            key: "create",
            value: // regPost(evt: any): void {
            //   const formData = new FormData(evt)
            //   const Registration = new RegAPI(formData)
            // }
            function create(data) {
                var _this = this;
                return (0, $28fbde635bea944d$export$2e2bcd8739ae039)((0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).mark(function _callee() {
                    return (0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.next = 2;
                                return _this.api.create(data);
                            case 2:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        },
        {
            key: "addUser",
            value: function addUser(data) {
                var _this = this;
                return (0, $28fbde635bea944d$export$2e2bcd8739ae039)((0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).mark(function _callee() {
                    return (0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.next = 2;
                                return _this.api.addUser(data);
                            case 2:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        },
        {
            key: "removeUser",
            value: function removeUser(data) {
                var _this = this;
                return (0, $28fbde635bea944d$export$2e2bcd8739ae039)((0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).mark(function _callee() {
                    return (0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.next = 2;
                                return _this.api.removeUser(data);
                            case 2:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        },
        {
            key: "logout",
            value: function logout() {
                var _this = this;
                return (0, $28fbde635bea944d$export$2e2bcd8739ae039)((0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).mark(function _callee() {
                    return (0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.next = 2;
                                return _this.api.logout();
                            case 2:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        },
        {
            key: "getToken",
            value: function getToken(data) {
                var _this = this;
                return (0, $28fbde635bea944d$export$2e2bcd8739ae039)((0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).mark(function _callee() {
                    var response;
                    return (0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.next = 2;
                                return _this.api.getToken(data);
                            case 2:
                                response = _ctx.sent;
                                return _ctx.abrupt("return", response);
                            case 4:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        },
        {
            key: "getchats",
            value: function getchats() {
                var _this = this;
                return (0, $28fbde635bea944d$export$2e2bcd8739ae039)((0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).mark(function _callee() {
                    var response;
                    return (0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.next = 2;
                                return _this.api.getchats();
                            case 2:
                                response = _ctx.sent;
                                return _ctx.abrupt("return", response);
                            case 4:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        }
    ]);
    return ChatController;
}();
var $0b6d8ac63988e58c$export$2e2bcd8739ae039 = new $0b6d8ac63988e58c$var$ChatController();







var $878616db7298ca2b$var$template = '\n<input class=\'{{classinput}}\' name=\'{{title}}\' placeholder="{{placeholder}}" required>\n<input type="hidden" name="message">\n<input type="submit" title="{{titleSubmit}}" class="{{classSubmit}}">\n';
var $878616db7298ca2b$export$2e2bcd8739ae039 = $878616db7298ca2b$var$template;



var $c3e12fcd3ad6b419$export$2e2bcd8739ae039 = /*#__PURE__*/ function(Block) {
    "use strict";
    (0, $5e1436f3cfc25af7$export$2e2bcd8739ae039)(Form, Block);
    var _super = (0, $70223088e8354a4f$export$2e2bcd8739ae039)(Form);
    function Form() {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, Form);
        return _super.apply(this, arguments);
    }
    (0, $37aec4d01f6984fa$export$2e2bcd8739ae039)(Form, [
        {
            key: "render",
            value: function render() {
                return this.compile((0, $878616db7298ca2b$export$2e2bcd8739ae039));
            }
        }
    ]);
    return Form;
}((0, $c53c9d43678cab83$export$2e2bcd8739ae039));






var $4db32e7f09d6deb1$var$template = '\n<input class=\'modal__input modal__input--userid\' name=\'users\' required placeholder="id user">\n<input type="hidden" class=\'modal__input modal__input--chatid\'\nname=\'chatId\' required placeholder="id chat">\n<button type="submit" class="modal__submit set__link">Add User</button>\n<button type="reset" class="modal__reset set__link">Close</button>\n<button type="reset" class="modal__remove set__link">Remove User</button>\n';
var $4db32e7f09d6deb1$export$2e2bcd8739ae039 = $4db32e7f09d6deb1$var$template;



var $3250f02b8a8af85e$export$2e2bcd8739ae039 = /*#__PURE__*/ function(Block) {
    "use strict";
    (0, $5e1436f3cfc25af7$export$2e2bcd8739ae039)(Modal, Block);
    var _super = (0, $70223088e8354a4f$export$2e2bcd8739ae039)(Modal);
    function Modal() {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, Modal);
        return _super.apply(this, arguments);
    }
    (0, $37aec4d01f6984fa$export$2e2bcd8739ae039)(Modal, [
        {
            key: "render",
            value: function render() {
                return this.compile((0, $4db32e7f09d6deb1$export$2e2bcd8739ae039));
            }
        }
    ]);
    return Modal;
}((0, $c53c9d43678cab83$export$2e2bcd8739ae039));



var $bc4eab7bee14bdf6$var$socket;
var $bc4eab7bee14bdf6$var$count = 0;
var $bc4eab7bee14bdf6$export$6829d5dec06e0024 = function() {
    var _ref = (0, $28fbde635bea944d$export$2e2bcd8739ae039)((0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).mark(function _callee() {
        return (0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).wrap(function _callee$(_ctx) {
            while(1)switch(_ctx.prev = _ctx.next){
                case 0:
                    _ctx.t0 = (0, $535ec53cbbbf8fb5$export$2e2bcd8739ae039);
                    _ctx.next = 3;
                    return (0, $0b6d8ac63988e58c$export$2e2bcd8739ae039).getchats();
                case 3:
                    _ctx.t1 = _ctx.sent;
                    _ctx.t2 = {
                        "class": "chat"
                    };
                    _ctx.t3 = {
                        click: function() {
                            var _ref = (0, $28fbde635bea944d$export$2e2bcd8739ae039)((0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).mark(function _callee(evt) {
                                var messages, token, chatId, userId, tokenId, url;
                                return (0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).wrap(function _callee$(_ctx) {
                                    while(1)switch(_ctx.prev = _ctx.next){
                                        case 0:
                                            if (evt.target.classList.contains("plus")) {
                                                document.querySelector(".modal").classList.remove("modal--nodisplay");
                                                document.querySelector(".modal__input--chatid").value = evt.target.parentElement.dataset.id;
                                                document.querySelector(".modal__reset").addEventListener("click", function(evt) {
                                                    evt.preventDefault();
                                                    document.querySelector(".modal").classList.add("modal--nodisplay");
                                                    document.querySelector(".modal").classList.remove("modal--display");
                                                });
                                                document.querySelector(".modal__remove").addEventListener("click", function(evt) {
                                                    evt.preventDefault();
                                                    var user = document.querySelector(".modal__input--userid").value;
                                                    var chat = document.querySelector(".modal__input--chatid").value;
                                                    var object = {
                                                        users: [
                                                            user
                                                        ],
                                                        chatId: chat
                                                    };
                                                    // let json = JSON.stringify(object);
                                                    (0, $0b6d8ac63988e58c$export$2e2bcd8739ae039).removeUser(object);
                                                });
                                            }
                                            if (!evt.target.classList.contains("chat__item")) {
                                                _ctx.next = 18;
                                                break;
                                            }
                                            messages = document.querySelectorAll(".messages__item");
                                            if (messages.length > 0) messages.forEach(function(item) {
                                                return item.remove();
                                            });
                                            _ctx.next = 6;
                                            return (0, $0b6d8ac63988e58c$export$2e2bcd8739ae039).getToken(evt.target.dataset.id);
                                        case 6:
                                            token = _ctx.sent;
                                            chatId = evt.target.dataset.id;
                                            _ctx.next = 10;
                                            return (0, $535ec53cbbbf8fb5$export$2e2bcd8739ae039).getState().user.id;
                                        case 10:
                                            userId = _ctx.sent;
                                            tokenId = token.token;
                                            url = "wss://ya-praktikum.tech/ws/chats/".concat(userId, "/").concat(chatId, "/").concat(tokenId);
                                            $bc4eab7bee14bdf6$var$socket = new WebSocket(url);
                                            // store.set('socket', { socket })
                                            // console.log(chatId, userId, tokenId, url, socket)
                                            $bc4eab7bee14bdf6$var$socket.addEventListener("open", (0, $28fbde635bea944d$export$2e2bcd8739ae039)((0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).mark(function _callee() {
                                                return (0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).wrap(function _callee$(_ctx) {
                                                    while(1)switch(_ctx.prev = _ctx.next){
                                                        case 0:
                                                            $bc4eab7bee14bdf6$var$socket.send(JSON.stringify({
                                                                content: "0",
                                                                type: "get old"
                                                            }));
                                                        case 1:
                                                        case "end":
                                                            return _ctx.stop();
                                                    }
                                                }, _callee);
                                            // socket.send(JSON.stringify({
                                            //   content: 'Моё первое сообщение миру!',
                                            //   type: 'message',
                                            // }));
                                            })));
                                            $bc4eab7bee14bdf6$var$socket.addEventListener("close", function(event) {
                                                if (event.wasClean) console.log("Соединение закрыто чисто");
                                                else console.log("Обрыв соединения");
                                                console.log("Код: ".concat(event.code, " | Причина: ").concat(event.reason));
                                            });
                                            $bc4eab7bee14bdf6$var$socket.addEventListener("message", function() {
                                                var _ref = (0, $28fbde635bea944d$export$2e2bcd8739ae039)((0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).mark(function _callee(event) {
                                                    var response, object;
                                                    return (0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).wrap(function _callee$(_ctx) {
                                                        while(1)switch(_ctx.prev = _ctx.next){
                                                            case 0:
                                                                _ctx.next = 2;
                                                                return event.data;
                                                            case 2:
                                                                response = _ctx.sent;
                                                                object = JSON.parse(response);
                                                                console.log((0, $535ec53cbbbf8fb5$export$2e2bcd8739ae039).getState());
                                                                (0, $535ec53cbbbf8fb5$export$2e2bcd8739ae039).set("messages", {
                                                                    items: object,
                                                                    attr: {
                                                                        "class": "messages"
                                                                    }
                                                                });
                                                                $bc4eab7bee14bdf6$var$count += 1;
                                                                if ($bc4eab7bee14bdf6$var$count && $bc4eab7bee14bdf6$var$count % 2 !== 0) $bc4eab7bee14bdf6$var$socket.send(JSON.stringify({
                                                                    content: "0",
                                                                    type: "get old"
                                                                }));
                                                                console.log((0, $535ec53cbbbf8fb5$export$2e2bcd8739ae039).getState());
                                                            case 9:
                                                            case "end":
                                                                return _ctx.stop();
                                                        }
                                                    }, _callee);
                                                }));
                                                return function(event) {
                                                    return _ref.apply(this, arguments);
                                                };
                                            }());
                                            $bc4eab7bee14bdf6$var$socket.addEventListener("error", function(event) {
                                                console.log("Ошибка", event.message);
                                            });
                                        case 18:
                                        case "end":
                                            return _ctx.stop();
                                    }
                                }, _callee);
                            }));
                            return function(evt) {
                                return _ref.apply(this, arguments);
                            };
                        }()
                    };
                    _ctx.t4 = {
                        items: _ctx.t1,
                        attr: _ctx.t2,
                        events: _ctx.t3
                    };
                    _ctx.t0.set.call(_ctx.t0, "chats", _ctx.t4);
                case 8:
                case "end":
                    return _ctx.stop();
            }
        }, _callee);
    }));
    return function addChatsToStore() {
        return _ref.apply(this, arguments);
    };
}();
var $bc4eab7bee14bdf6$var$chats = new (0, $9b62beb2a57aab2e$export$2e2bcd8739ae039)();
var $bc4eab7bee14bdf6$var$messages = new (0, $100296d85c255ba2$export$2e2bcd8739ae039)();
var $bc4eab7bee14bdf6$var$settings = new (0, $c0f60909d709bd2e$export$2e2bcd8739ae039)("div", {
    items: [
        {
            url: "*/settings",
            title: "Settings",
            "class": "set__link"
        }
    ],
    attr: {
        "class": "set"
    },
    events: {
        click: (0, $eb2b7b7cbe4465f0$export$75a0fd467e704b5c)
    }
});
var $bc4eab7bee14bdf6$var$logout = new (0, $206e8296db5148b7$export$2e2bcd8739ae039)("div", {
    items: [
        {
            type: "button",
            "class": "set__link",
            title: "logout"
        }
    ],
    attr: {
        "class": "logout"
    },
    events: {
        click: function(evt) {
            evt.preventDefault();
            // console.log(document.querySelector('form'))
            // let json = JSON.stringify(object);
            (0, $0b6d8ac63988e58c$export$2e2bcd8739ae039).logout().then(function() {
                return (0, $4e72b501f709fb5a$export$2e2bcd8739ae039).go("/");
            });
        }
    }
});
var $bc4eab7bee14bdf6$var$form = new (0, $c3e12fcd3ad6b419$export$2e2bcd8739ae039)("form", {
    classinput: "main__chat-input",
    title: "title",
    placeholder: "new chat",
    titleSubmit: "newchat",
    classSubmit: "set__link",
    attr: {
        "class": "main__chat-form",
        method: "post"
    },
    events: {
        submit: function(evt) {
            evt.preventDefault();
            console.log(evt);
            var data = new FormData(document.querySelector(".main__chat-form"));
            var object = {};
            data.forEach(function(value, key) {
                return object[key] = value;
            });
            // let json = JSON.stringify(object);
            (0, $0b6d8ac63988e58c$export$2e2bcd8739ae039).create(object);
        }
    }
});
var $bc4eab7bee14bdf6$var$formMessages = new (0, $c3e12fcd3ad6b419$export$2e2bcd8739ae039)("form", {
    classinput: "main__message-input",
    title: "content",
    placeholder: "new message",
    titleSubmit: "new message",
    classSubmit: "set__link set__link--message",
    attr: {
        "class": "main__message-form",
        method: "post"
    },
    events: {
        submit: function() {
            var _ref = (0, $28fbde635bea944d$export$2e2bcd8739ae039)((0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).mark(function _callee(evt) {
                return (0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).wrap(function _callee$(_ctx) {
                    while(1)switch(_ctx.prev = _ctx.next){
                        case 0:
                            evt.preventDefault();
                            // const socket = await store.getState()
                            $bc4eab7bee14bdf6$var$socket.send(JSON.stringify({
                                content: document.querySelector(".main__message-input").value,
                                type: "message"
                            }));
                        case 2:
                        case "end":
                            return _ctx.stop();
                    }
                }, _callee);
            }));
            return function(evt) {
                return _ref.apply(this, arguments);
            };
        }()
    }
});
var $bc4eab7bee14bdf6$var$modalAdd = new (0, $3250f02b8a8af85e$export$2e2bcd8739ae039)("form", {
    attr: {
        "class": "modal",
        method: "post"
    },
    events: {
        submit: function(evt) {
            evt.preventDefault();
            // const data = new FormData(evt.target);
            var user = document.querySelector(".modal__input--userid").value;
            var chat = document.querySelector(".modal__input--chatid").value;
            var object = {
                users: [
                    user
                ],
                chatId: chat
            };
            (0, $0b6d8ac63988e58c$export$2e2bcd8739ae039).addUser(object);
        }
    }
});
var $bc4eab7bee14bdf6$export$2e2bcd8739ae039 = /*#__PURE__*/ function(Chat) {
    "use strict";
    (0, $5e1436f3cfc25af7$export$2e2bcd8739ae039)(ChatPage, Chat);
    var _super = (0, $70223088e8354a4f$export$2e2bcd8739ae039)(ChatPage);
    function ChatPage() {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, ChatPage);
        return _super.call(this, "div", {
            logout: $bc4eab7bee14bdf6$var$logout,
            settings: $bc4eab7bee14bdf6$var$settings,
            form: $bc4eab7bee14bdf6$var$form,
            chats: $bc4eab7bee14bdf6$var$chats,
            messages: $bc4eab7bee14bdf6$var$messages,
            formMessages: $bc4eab7bee14bdf6$var$formMessages,
            attr: {
                "class": "main__chat"
            },
            modalAdd: $bc4eab7bee14bdf6$var$modalAdd
        });
    }
    return ChatPage;
}((0, $0e46deb844cb029b$export$2e2bcd8739ae039));









var $9099b6cf4a6851d7$var$template = '\n<h2 class="title reg__title">{{title}}</h2>\n{{{inputs}}}\n{{{buttons}}}\n<div class="error"></div>\n';
var $9099b6cf4a6851d7$export$2e2bcd8739ae039 = $9099b6cf4a6851d7$var$template;



var $a57eaeee0762ee23$export$2e2bcd8739ae039 = /*#__PURE__*/ function(Block) {
    "use strict";
    (0, $5e1436f3cfc25af7$export$2e2bcd8739ae039)(Reg, Block);
    var _super = (0, $70223088e8354a4f$export$2e2bcd8739ae039)(Reg);
    function Reg() {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, Reg);
        return _super.apply(this, arguments);
    }
    (0, $37aec4d01f6984fa$export$2e2bcd8739ae039)(Reg, [
        {
            key: "render",
            value: function render() {
                return this.compile((0, $9099b6cf4a6851d7$export$2e2bcd8739ae039));
            }
        }
    ]);
    return Reg;
}((0, $c53c9d43678cab83$export$2e2bcd8739ae039));












var $969aaf3356ad41a9$var$route = new (0, $107da7d0a72a9927$export$2e2bcd8739ae039)();
var $969aaf3356ad41a9$export$1f3370db068e9547 = /*#__PURE__*/ function() {
    "use strict";
    function RegAPI() {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, RegAPI);
        this.http = new (0, $107da7d0a72a9927$export$2e2bcd8739ae039)();
    }
    (0, $37aec4d01f6984fa$export$2e2bcd8739ae039)(RegAPI, [
        {
            key: "create",
            value: function create(data) {
                return this.http.post("/auth/signup", data);
            }
        }
    ]);
    return RegAPI;
}();


var $807eed948d940bd3$var$RegController = /*#__PURE__*/ function() {
    "use strict";
    function RegController() {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, RegController);
        this.api = new (0, $969aaf3356ad41a9$export$1f3370db068e9547)();
    }
    (0, $37aec4d01f6984fa$export$2e2bcd8739ae039)(RegController, [
        {
            key: "create",
            value: // regPost(evt: any): void {
            //   const formData = new FormData(evt)
            //   const Registration = new RegAPI(formData)
            // }
            function create(data) {
                var _this = this;
                return (0, $28fbde635bea944d$export$2e2bcd8739ae039)((0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).mark(function _callee() {
                    return (0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.next = 2;
                                return _this.api.create(data);
                            case 2:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        }
    ]);
    return RegController;
}();
var $807eed948d940bd3$export$2e2bcd8739ae039 = new $807eed948d940bd3$var$RegController();


var $27628ae5b2c6aacf$var$inputs = new (0, $62751d5f23ea729c$export$2e2bcd8739ae039)("div", {
    items: [
        {
            title: "First name",
            classInput: "input reg__input reg__input--first-name",
            classLabel: "label reg__label",
            name: "first_name",
            type: "text",
            id: "first_name"
        },
        {
            title: "Second name",
            classInput: "input reg__input reg__input--second-name",
            classLabel: "label reg__label",
            name: "second_name",
            type: "text",
            id: "second_name"
        },
        {
            title: "Login",
            classInput: "input reg__input reg__input--login",
            classLabel: "label reg__label",
            name: "login",
            type: "text",
            id: "login"
        },
        {
            title: "Email",
            classInput: "input reg__input reg__input--email",
            classLabel: "label reg__label",
            name: "email",
            type: "text",
            id: "email"
        },
        {
            title: "Phone",
            classInput: "input reg__input reg__input--phone",
            classLabel: "label reg__label",
            name: "phone",
            type: "text",
            id: "phone"
        },
        {
            title: "Password",
            classInput: "input reg__input reg__input--password",
            classLabel: "label reg__label",
            name: "password",
            type: "password",
            id: "password"
        }
    ],
    attr: {
        "class": "reg__input-wrapper"
    },
    events: {
        focusin: (0, $eb2b7b7cbe4465f0$export$cc5dae9a911bfe2),
        focusout: (0, $eb2b7b7cbe4465f0$export$cc5dae9a911bfe2)
    }
});
var $27628ae5b2c6aacf$var$buttons = new (0, $206e8296db5148b7$export$2e2bcd8739ae039)("div", {
    items: [
        {
            type: "submit",
            "class": "btn btn--sub",
            title: "Create profile"
        }
    ],
    attr: {
        "class": "reg__btn-wrapper"
    }
});
var $27628ae5b2c6aacf$export$2e2bcd8739ae039 = /*#__PURE__*/ function(Reg) {
    "use strict";
    (0, $5e1436f3cfc25af7$export$2e2bcd8739ae039)(RegPage, Reg);
    var _super = (0, $70223088e8354a4f$export$2e2bcd8739ae039)(RegPage);
    function RegPage() {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, RegPage);
        return _super.call(this, "form", {
            inputs: $27628ae5b2c6aacf$var$inputs,
            buttons: $27628ae5b2c6aacf$var$buttons,
            attr: {
                "class": "form reg"
            },
            events: {
                submit: function(evt) {
                    evt.preventDefault();
                    // console.log(document.querySelector('form'))
                    var data = new FormData(document.querySelector("form"));
                    var object = {};
                    data.forEach(function(value, key) {
                        return object[key] = value;
                    });
                    // let json = JSON.stringify(object);
                    if (0, $eb2b7b7cbe4465f0$export$4ce568c1357045cd) (0, $807eed948d940bd3$export$2e2bcd8739ae039).create(object);
                }
            }
        });
    }
    return RegPage;
} // renderDom('.app', reg);
((0, $a57eaeee0762ee23$export$2e2bcd8739ae039));






function $b2cad0b2d70326e0$var$isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function $b2cad0b2d70326e0$var$construct(Parent, args, Class) {
    if ($b2cad0b2d70326e0$var$isNativeReflectConstruct()) $b2cad0b2d70326e0$var$construct = Reflect.construct;
    else $b2cad0b2d70326e0$var$construct = function construct(Parent, args, Class) {
        var a = [
            null
        ];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) (0, $55a583f5334a6c12$export$2e2bcd8739ae039)(instance, Class.prototype);
        return instance;
    };
    return $b2cad0b2d70326e0$var$construct.apply(null, arguments);
}
function $b2cad0b2d70326e0$export$2e2bcd8739ae039(Parent, args, Class) {
    return $b2cad0b2d70326e0$var$construct.apply(null, arguments);
}


function $f630ab5c8ad9011b$export$2e2bcd8739ae039(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}




function $c9f53b5e2e3000f5$var$wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    $c9f53b5e2e3000f5$var$wrapNativeSuper = function wrapNativeSuper(Class) {
        if (Class === null || !(0, $f630ab5c8ad9011b$export$2e2bcd8739ae039)(Class)) return Class;
        if (typeof Class !== "function") throw new TypeError("Super expression must either be null or a function");
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return (0, $b2cad0b2d70326e0$export$2e2bcd8739ae039)(Class, arguments, (0, $bf992d86b9361765$export$2e2bcd8739ae039)(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return (0, $55a583f5334a6c12$export$2e2bcd8739ae039)(Wrapper, Class);
    };
    return $c9f53b5e2e3000f5$var$wrapNativeSuper(Class);
}
function $c9f53b5e2e3000f5$export$2e2bcd8739ae039(Class) {
    return $c9f53b5e2e3000f5$var$wrapNativeSuper(Class);
}








var $7ddb49493414471d$var$template = '\n<h2 class="title reg__title">{{title}}</h2>\n<ul class="user__list">\n<li class="user__item user__item--avatar">\n<img src="{{avatar}}" width="150" height="150" alt="avatar">\n</li>\n<li class="user__item user__item--nick">Nickname:{{nick}}</li>\n<li class="user__item user__item--first">Firstname:{{first}}</li>\n<li class="user__item user__item--second">Secondname:{{second}}</li>\n<li class="user__item user__item--id">Id:{{id}}</li>\n<li class="user__item user__item--email">Email:{{email}}</li>\n<li class="user__item user__item--phone">Phone:{{phone}}</li>\n<li class="user__item user__item--login">Login:{{login}}</li>\n</ul>\n{{{links}}}\n';
var $7ddb49493414471d$export$2e2bcd8739ae039 = $7ddb49493414471d$var$template;



var $56fcaebe2ebf701c$export$2e2bcd8739ae039 = /*#__PURE__*/ function(Block) {
    "use strict";
    (0, $5e1436f3cfc25af7$export$2e2bcd8739ae039)(Reg, Block);
    var _super = (0, $70223088e8354a4f$export$2e2bcd8739ae039)(Reg);
    function Reg() {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, Reg);
        return _super.apply(this, arguments);
    }
    (0, $37aec4d01f6984fa$export$2e2bcd8739ae039)(Reg, [
        {
            key: "render",
            value: function render() {
                return this.compile((0, $7ddb49493414471d$export$2e2bcd8739ae039));
            }
        }
    ]);
    return Reg;
}((0, $c53c9d43678cab83$export$2e2bcd8739ae039));





console.log("set");
var $8f40f708c880a6d0$export$26c30eaac7b75586 = function() {
    var _ref = (0, $28fbde635bea944d$export$2e2bcd8739ae039)((0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).mark(function _callee(data) {
        return (0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).wrap(function _callee$(_ctx) {
            while(1)switch(_ctx.prev = _ctx.next){
                case 0:
                    (0, $535ec53cbbbf8fb5$export$2e2bcd8739ae039).set("user", data);
                case 1:
                case "end":
                    return _ctx.stop();
            }
        }, _callee);
    }));
    return function addUserToStore(data) {
        return _ref.apply(this, arguments);
    };
}();
var $8f40f708c880a6d0$var$links = new (0, $c0f60909d709bd2e$export$2e2bcd8739ae039)("div", {
    items: [
        {
            url: "*/avatar",
            title: "Avatar change",
            "class": "btn btn__link btn__link--reg"
        },
        {
            url: "*/user",
            title: "Info change",
            "class": "btn btn__link btn__link--reg"
        },
        {
            url: "*/password",
            title: "Pass change",
            "class": "btn btn__link btn__link--reg"
        }
    ],
    attr: {
        "class": "set__btn-wrapper"
    },
    events: {
        click: (0, $eb2b7b7cbe4465f0$export$75a0fd467e704b5c)
    }
});
var $8f40f708c880a6d0$export$2e2bcd8739ae039 = /*#__PURE__*/ function(Set) {
    "use strict";
    (0, $5e1436f3cfc25af7$export$2e2bcd8739ae039)(SetPage, Set);
    var _super = (0, $70223088e8354a4f$export$2e2bcd8739ae039)(SetPage);
    function SetPage() {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, SetPage);
        return _super.call(this, "div", {
            title: "Settings",
            avatar: (0, $535ec53cbbbf8fb5$export$2e2bcd8739ae039).getState().user.avatar ? (0, $535ec53cbbbf8fb5$export$2e2bcd8739ae039).getState().user.avatar : "https://trikky.ru/wp-content/blogs.dir/1/files/2021/12/30/chat-avatar-136.jpg",
            nick: (0, $535ec53cbbbf8fb5$export$2e2bcd8739ae039).getState().user.display_name ? (0, $535ec53cbbbf8fb5$export$2e2bcd8739ae039).getState().user.display_name : "no login",
            first: (0, $535ec53cbbbf8fb5$export$2e2bcd8739ae039).getState().user.first_name,
            second: (0, $535ec53cbbbf8fb5$export$2e2bcd8739ae039).getState().user.second_name,
            id: (0, $535ec53cbbbf8fb5$export$2e2bcd8739ae039).getState().user.id,
            email: (0, $535ec53cbbbf8fb5$export$2e2bcd8739ae039).getState().user.email,
            phone: (0, $535ec53cbbbf8fb5$export$2e2bcd8739ae039).getState().user.phone,
            login: (0, $535ec53cbbbf8fb5$export$2e2bcd8739ae039).getState().user.login,
            links: $8f40f708c880a6d0$var$links,
            attr: {
                "class": "set"
            }
        });
    }
    return SetPage;
} // renderDom('.app', set);
((0, $c9f53b5e2e3000f5$export$2e2bcd8739ae039)((0, $56fcaebe2ebf701c$export$2e2bcd8739ae039)));












var $beb0b988221e7637$var$route = new (0, $107da7d0a72a9927$export$2e2bcd8739ae039)();
var $beb0b988221e7637$export$d155ecaca10b64e2 = /*#__PURE__*/ function() {
    "use strict";
    function AuthAPI() {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, AuthAPI);
        this.http = new (0, $107da7d0a72a9927$export$2e2bcd8739ae039)();
    }
    (0, $37aec4d01f6984fa$export$2e2bcd8739ae039)(AuthAPI, [
        {
            key: "user",
            value: function user() {
                var _this = this;
                return (0, $28fbde635bea944d$export$2e2bcd8739ae039)((0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).mark(function _callee() {
                    var response;
                    return (0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.next = 2;
                                return _this.http.get("/auth/user");
                            case 2:
                                response = _ctx.sent;
                                _ctx.next = 5;
                                return (0, $8f40f708c880a6d0$export$26c30eaac7b75586)(response);
                            case 5:
                                return _ctx.abrupt("return", response);
                            case 6:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        },
        {
            key: "create",
            value: function create(data) {
                return this.http.post("/auth/signin", data);
            }
        }
    ]);
    return AuthAPI;
}();


var $74dd2735969a6299$var$AuthController = /*#__PURE__*/ function() {
    "use strict";
    function AuthController() {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, AuthController);
        this.api = new (0, $beb0b988221e7637$export$d155ecaca10b64e2)();
    }
    (0, $37aec4d01f6984fa$export$2e2bcd8739ae039)(AuthController, [
        {
            key: "user",
            value: // regPost(evt: any): void {
            //   const formData = new FormData(evt)
            //   const Registration = new RegAPI(formData)
            // }
            function user() {
                var _this = this;
                return (0, $28fbde635bea944d$export$2e2bcd8739ae039)((0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).mark(function _callee() {
                    return (0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.next = 2;
                                return _this.api.user();
                            case 2:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        },
        {
            key: "create",
            value: function create(data) {
                var _this = this;
                return (0, $28fbde635bea944d$export$2e2bcd8739ae039)((0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).mark(function _callee() {
                    return (0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.next = 2;
                                return _this.api.create(data);
                            case 2:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        }
    ]);
    return AuthController;
}();
var $74dd2735969a6299$export$2e2bcd8739ae039 = new $74dd2735969a6299$var$AuthController();











var $a84564cc9b10f749$var$template = '\n<h2 class="title reg__title">{{title}}</h2>\n{{{inputs}}}\n{{{buttons}}}\n<div class="error"></div>\n';
var $a84564cc9b10f749$export$2e2bcd8739ae039 // export default `<form class="form set">
 //     {{> title label="Settings" class="title set__title" }}
 //     <div class="set__input-wrapper">
 //       <ul class="set__list">
 //         <li class="set__item">
 //           {{> input label="Avatar" classInput="input set__input set__input--avatar"
 //           classLabel="label set__label"
 //           name="avatar" type="file" id="first_name"}}
 //         </li>
 //         <li class="set__item">
 //           {{> input label="First name" classInput="input set__input set__input--first-name"
 //           classLabel="label
 //           set__label"
 //           name="first_name" type="text" id="first_name"}}
 //         </li>
 //         <li class="set__item">
 //           {{> input label="Second name" classInput="input set__input set__input--second-name"
 //           classLabel="label
 //           set__label"
 //           name="second_name" type="text" id="second_name"}}
 //         </li>
 //         <li class="set__item">
 //           {{> input label="Nickname" classInput="input set__input set__input--display-name"
 //           classLabel="label
 //           set__label"
 //           name="login" type="text" id="display_name"}}
 //         </li>
 //         <li class="set__item">
 //           {{> input label="Login" classInput="input set__input set__input--login"
 //           classLabel="label set__label"
 //           name="login" type="text" id="login"}}
 //         </li>
 //         <li class="set__item">
 //           {{> input label="Email" classInput="input set__input set__input--email"
 //           classLabel="label set__label"
 //           name="email" type="text" id="email"}}
 //         </li>
 //         <li class="set__item">
 //           {{> input label="Phone" classInput="input set__input set__input--phone"
 //           classLabel="label set__label"
 //           name="phone" type="text" id="phone"}}
 //         </li>
 //         <li class="set__item">
 //           {{> input label="New password" classInput="input set__input set__input--password-new"
 //           classLabel="label
 //           set__label"
 //           name="password_new" type="text" id="password_new"}}
 //         </li>
 //         <li class="set__item">
 //           {{> input label="Old password" classInput="input set__input set__input--password"
 //           classLabel="label
 //           set__label"
 //           name="password" type="text" id="password"}}
 //         </li>
 //       </ul>
 //     </div>
 //     <div class="auth__btn-wrapper">
 //       {{> button label="Save information" class="btn btn--save" }}
 //     </div>
 //   </form>`;
 = $a84564cc9b10f749$var$template;



var $f99ce5732e15701e$export$2e2bcd8739ae039 = /*#__PURE__*/ function(Block) {
    "use strict";
    (0, $5e1436f3cfc25af7$export$2e2bcd8739ae039)(Avatar, Block);
    var _super = (0, $70223088e8354a4f$export$2e2bcd8739ae039)(Avatar);
    function Avatar() {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, Avatar);
        return _super.apply(this, arguments);
    }
    (0, $37aec4d01f6984fa$export$2e2bcd8739ae039)(Avatar, [
        {
            key: "render",
            value: function render() {
                return this.compile((0, $a84564cc9b10f749$export$2e2bcd8739ae039));
            }
        }
    ]);
    return Avatar;
}((0, $c53c9d43678cab83$export$2e2bcd8739ae039));












var $cc49ee30f40c3ec0$var$route = new (0, $107da7d0a72a9927$export$2e2bcd8739ae039)();
var $cc49ee30f40c3ec0$export$876a370b744f2197 = /*#__PURE__*/ function() {
    "use strict";
    function UserAPI() {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, UserAPI);
        this.http = new (0, $107da7d0a72a9927$export$2e2bcd8739ae039)();
    }
    (0, $37aec4d01f6984fa$export$2e2bcd8739ae039)(UserAPI, [
        {
            key: "user",
            value: function user(data) {
                return this.http.put("/user/profile", data);
            }
        },
        {
            key: "avatar",
            value: function avatar(data) {
                return this.http.put("/user/profile/avatar", data);
            }
        },
        {
            key: "password",
            value: function password(data) {
                return this.http.put("/user/password", data);
            }
        }
    ]);
    return UserAPI;
}();


var $afa20fe0f107dd50$var$UserController = /*#__PURE__*/ function() {
    "use strict";
    function UserController() {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, UserController);
        this.api = new (0, $cc49ee30f40c3ec0$export$876a370b744f2197)();
    }
    (0, $37aec4d01f6984fa$export$2e2bcd8739ae039)(UserController, [
        {
            key: "user",
            value: // regPost(evt: any): void {
            //   const formData = new FormData(evt)
            //   const Registration = new RegAPI(formData)
            // }
            function user(data) {
                var _this = this;
                return (0, $28fbde635bea944d$export$2e2bcd8739ae039)((0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).mark(function _callee() {
                    return (0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.next = 2;
                                return _this.api.user(data);
                            case 2:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        },
        {
            key: "avatar",
            value: function avatar(data) {
                var _this = this;
                return (0, $28fbde635bea944d$export$2e2bcd8739ae039)((0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).mark(function _callee() {
                    return (0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.next = 2;
                                return _this.api.avatar(data);
                            case 2:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        },
        {
            key: "password",
            value: function password(data) {
                var _this = this;
                return (0, $28fbde635bea944d$export$2e2bcd8739ae039)((0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).mark(function _callee() {
                    return (0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.next = 2;
                                return _this.api.password(data);
                            case 2:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        }
    ]);
    return UserController;
}();
var $afa20fe0f107dd50$export$2e2bcd8739ae039 = new $afa20fe0f107dd50$var$UserController();


var $7ea42253428be078$var$inputs = new (0, $62751d5f23ea729c$export$2e2bcd8739ae039)("div", {
    items: [
        {
            title: "Avatar",
            classInput: "input set__input set__input--avatar",
            classLabel: "label set__label",
            name: "avatar",
            type: "file",
            id: "avatar"
        }
    ],
    attr: {
        "class": "set__input-wrapper"
    },
    events: {
        focusin: (0, $eb2b7b7cbe4465f0$export$cc5dae9a911bfe2),
        focusout: (0, $eb2b7b7cbe4465f0$export$cc5dae9a911bfe2)
    }
});
var $7ea42253428be078$var$buttons = new (0, $206e8296db5148b7$export$2e2bcd8739ae039)("div", {
    items: [
        {
            type: "submit",
            "class": "btn btn--save",
            title: "Save information"
        }
    ],
    attr: {
        "class": "set__btn-wrapper"
    }
});
var $7ea42253428be078$export$2e2bcd8739ae039 = /*#__PURE__*/ function(Avatar) {
    "use strict";
    (0, $5e1436f3cfc25af7$export$2e2bcd8739ae039)(AvatarPage, Avatar);
    var _super = (0, $70223088e8354a4f$export$2e2bcd8739ae039)(AvatarPage);
    function AvatarPage() {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, AvatarPage);
        return _super.call(this, "form", {
            title: "Settings",
            inputs: $7ea42253428be078$var$inputs,
            buttons: $7ea42253428be078$var$buttons,
            attr: {
                "class": "form set"
            },
            events: {
                submit: function(evt) {
                    evt.preventDefault();
                    // console.log(document.querySelector('form'))
                    var data = new FormData(document.querySelector("form"));
                    var object = {};
                    // data.forEach((value, key) => object[key] = value);
                    // let json = JSON.stringify(object);
                    if (0, $eb2b7b7cbe4465f0$export$4ce568c1357045cd) {
                        console.log(data);
                        (0, $afa20fe0f107dd50$export$2e2bcd8739ae039).avatar(data);
                    }
                }
            }
        });
    }
    return AvatarPage;
} // renderDom('.app', set);
((0, $f99ce5732e15701e$export$2e2bcd8739ae039));









var $127b4ebcce742d92$var$template = '\n<h2 class="title reg__title">{{title}}</h2>\n{{{inputs}}}\n{{{buttons}}}\n<div class="error"></div>\n';
var $127b4ebcce742d92$export$2e2bcd8739ae039 // export default `<form class="form set">
 //     {{> title label="Settings" class="title set__title" }}
 //     <div class="set__input-wrapper">
 //       <ul class="set__list">
 //         <li class="set__item">
 //           {{> input label="Avatar" classInput="input set__input set__input--avatar"
 //           classLabel="label set__label"
 //           name="avatar" type="file" id="first_name"}}
 //         </li>
 //         <li class="set__item">
 //           {{> input label="First name" classInput="input set__input set__input--first-name"
 //           classLabel="label
 //           set__label"
 //           name="first_name" type="text" id="first_name"}}
 //         </li>
 //         <li class="set__item">
 //           {{> input label="Second name" classInput="input set__input set__input--second-name"
 //           classLabel="label
 //           set__label"
 //           name="second_name" type="text" id="second_name"}}
 //         </li>
 //         <li class="set__item">
 //           {{> input label="Nickname" classInput="input set__input set__input--display-name"
 //           classLabel="label
 //           set__label"
 //           name="login" type="text" id="display_name"}}
 //         </li>
 //         <li class="set__item">
 //           {{> input label="Login" classInput="input set__input set__input--login"
 //           classLabel="label set__label"
 //           name="login" type="text" id="login"}}
 //         </li>
 //         <li class="set__item">
 //           {{> input label="Email" classInput="input set__input set__input--email"
 //           classLabel="label set__label"
 //           name="email" type="text" id="email"}}
 //         </li>
 //         <li class="set__item">
 //           {{> input label="Phone" classInput="input set__input set__input--phone"
 //           classLabel="label set__label"
 //           name="phone" type="text" id="phone"}}
 //         </li>
 //         <li class="set__item">
 //           {{> input label="New password" classInput="input set__input set__input--password-new"
 //           classLabel="label
 //           set__label"
 //           name="password_new" type="text" id="password_new"}}
 //         </li>
 //         <li class="set__item">
 //           {{> input label="Old password" classInput="input set__input set__input--password"
 //           classLabel="label
 //           set__label"
 //           name="password" type="text" id="password"}}
 //         </li>
 //       </ul>
 //     </div>
 //     <div class="auth__btn-wrapper">
 //       {{> button label="Save information" class="btn btn--save" }}
 //     </div>
 //   </form>`;
 = $127b4ebcce742d92$var$template;



var $211c9a93cbe0b0fb$export$2e2bcd8739ae039 = /*#__PURE__*/ function(Block) {
    "use strict";
    (0, $5e1436f3cfc25af7$export$2e2bcd8739ae039)(User, Block);
    var _super = (0, $70223088e8354a4f$export$2e2bcd8739ae039)(User);
    function User() {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, User);
        return _super.apply(this, arguments);
    }
    (0, $37aec4d01f6984fa$export$2e2bcd8739ae039)(User, [
        {
            key: "render",
            value: function render() {
                return this.compile((0, $127b4ebcce742d92$export$2e2bcd8739ae039));
            }
        }
    ]);
    return User;
}((0, $c53c9d43678cab83$export$2e2bcd8739ae039));






var $0acda583b951d28d$var$inputs = new (0, $62751d5f23ea729c$export$2e2bcd8739ae039)("div", {
    items: [
        {
            title: "First name",
            classInput: "input set__input set__input--first-name",
            classLabel: "label set__label",
            name: "first_name",
            type: "text",
            id: "first_name"
        },
        {
            title: "Second name",
            classInput: "input set__input set__input--second-name",
            classLabel: "label set__label",
            name: "second_name",
            type: "text",
            id: "second_name"
        },
        {
            title: "Nick name",
            classInput: "input set__input set__input--nick-name",
            classLabel: "label set__label",
            name: "display_name",
            type: "text",
            id: "display_name"
        },
        {
            title: "Login",
            classInput: "input set__input set__input--login",
            classLabel: "label set__label",
            name: "login",
            type: "text",
            id: "login"
        },
        {
            title: "Email",
            classInput: "input set__input set__input--email",
            classLabel: "label set__label",
            name: "email",
            type: "text",
            id: "email"
        },
        {
            title: "Phone",
            classInput: "input set__input set__input--phone",
            classLabel: "label set__label",
            name: "phone",
            type: "text",
            id: "phone"
        }
    ],
    attr: {
        "class": "set__input-wrapper"
    },
    events: {
        focusin: (0, $eb2b7b7cbe4465f0$export$cc5dae9a911bfe2),
        focusout: (0, $eb2b7b7cbe4465f0$export$cc5dae9a911bfe2)
    }
});
var $0acda583b951d28d$var$buttons = new (0, $206e8296db5148b7$export$2e2bcd8739ae039)("div", {
    items: [
        {
            type: "submit",
            "class": "btn btn--save",
            title: "Save information"
        }
    ],
    attr: {
        "class": "set__btn-wrapper"
    }
});
var $0acda583b951d28d$export$2e2bcd8739ae039 = /*#__PURE__*/ function(User) {
    "use strict";
    (0, $5e1436f3cfc25af7$export$2e2bcd8739ae039)(UserPage, User);
    var _super = (0, $70223088e8354a4f$export$2e2bcd8739ae039)(UserPage);
    function UserPage() {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, UserPage);
        return _super.call(this, "form", {
            title: "Settings",
            inputs: $0acda583b951d28d$var$inputs,
            buttons: $0acda583b951d28d$var$buttons,
            attr: {
                "class": "form set"
            },
            events: {
                submit: function(evt) {
                    evt.preventDefault();
                    // console.log(document.querySelector('form'))
                    var data = new FormData(document.querySelector("form"));
                    var object = {};
                    data.forEach(function(value, key) {
                        return object[key] = value;
                    });
                    // let json = JSON.stringify(object);
                    if (0, $eb2b7b7cbe4465f0$export$4ce568c1357045cd) (0, $afa20fe0f107dd50$export$2e2bcd8739ae039).user(object);
                }
            }
        });
    }
    return UserPage;
} // renderDom('.app', set);
((0, $211c9a93cbe0b0fb$export$2e2bcd8739ae039));









var $35faefa732d4fb5e$var$template = '\n<h2 class="title reg__title">{{title}}</h2>\n{{{inputs}}}\n{{{buttons}}}\n<div class="error"></div>\n';
var $35faefa732d4fb5e$export$2e2bcd8739ae039 // export default `<form class="form set">
 //     {{> title label="Settings" class="title set__title" }}
 //     <div class="set__input-wrapper">
 //       <ul class="set__list">
 //         <li class="set__item">
 //           {{> input label="Avatar" classInput="input set__input set__input--avatar"
 //           classLabel="label set__label"
 //           name="avatar" type="file" id="first_name"}}
 //         </li>
 //         <li class="set__item">
 //           {{> input label="First name" classInput="input set__input set__input--first-name"
 //           classLabel="label
 //           set__label"
 //           name="first_name" type="text" id="first_name"}}
 //         </li>
 //         <li class="set__item">
 //           {{> input label="Second name" classInput="input set__input set__input--second-name"
 //           classLabel="label
 //           set__label"
 //           name="second_name" type="text" id="second_name"}}
 //         </li>
 //         <li class="set__item">
 //           {{> input label="Nickname" classInput="input set__input set__input--display-name"
 //           classLabel="label
 //           set__label"
 //           name="login" type="text" id="display_name"}}
 //         </li>
 //         <li class="set__item">
 //           {{> input label="Login" classInput="input set__input set__input--login"
 //           classLabel="label set__label"
 //           name="login" type="text" id="login"}}
 //         </li>
 //         <li class="set__item">
 //           {{> input label="Email" classInput="input set__input set__input--email"
 //           classLabel="label set__label"
 //           name="email" type="text" id="email"}}
 //         </li>
 //         <li class="set__item">
 //           {{> input label="Phone" classInput="input set__input set__input--phone"
 //           classLabel="label set__label"
 //           name="phone" type="text" id="phone"}}
 //         </li>
 //         <li class="set__item">
 //           {{> input label="New password" classInput="input set__input set__input--password-new"
 //           classLabel="label
 //           set__label"
 //           name="password_new" type="text" id="password_new"}}
 //         </li>
 //         <li class="set__item">
 //           {{> input label="Old password" classInput="input set__input set__input--password"
 //           classLabel="label
 //           set__label"
 //           name="password" type="text" id="password"}}
 //         </li>
 //       </ul>
 //     </div>
 //     <div class="auth__btn-wrapper">
 //       {{> button label="Save information" class="btn btn--save" }}
 //     </div>
 //   </form>`;
 = $35faefa732d4fb5e$var$template;



var $72d6cf9b007b6663$export$2e2bcd8739ae039 = /*#__PURE__*/ function(Block) {
    "use strict";
    (0, $5e1436f3cfc25af7$export$2e2bcd8739ae039)(Password, Block);
    var _super = (0, $70223088e8354a4f$export$2e2bcd8739ae039)(Password);
    function Password() {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, Password);
        return _super.apply(this, arguments);
    }
    (0, $37aec4d01f6984fa$export$2e2bcd8739ae039)(Password, [
        {
            key: "render",
            value: function render() {
                return this.compile((0, $35faefa732d4fb5e$export$2e2bcd8739ae039));
            }
        }
    ]);
    return Password;
}((0, $c53c9d43678cab83$export$2e2bcd8739ae039));






var $74db8bbe4e0d36b4$var$inputs = new (0, $62751d5f23ea729c$export$2e2bcd8739ae039)("div", {
    items: [
        {
            title: "Old password",
            classInput: "input set__input set__input--password",
            classLabel: "label set__label",
            name: "oldPassword",
            type: "password",
            id: "password"
        },
        {
            title: "New password",
            classInput: "input set__input set__input--password-new",
            classLabel: "label set__label",
            name: "newPassword",
            type: "password",
            id: "password_new"
        },
        {
            title: "Repeat New password",
            classInput: "input set__input set__input--password-new",
            classLabel: "label set__label",
            name: "newPassword",
            type: "password",
            id: "password_new"
        }
    ],
    attr: {
        "class": "set__input-wrapper"
    },
    events: {
        focusin: (0, $eb2b7b7cbe4465f0$export$cc5dae9a911bfe2),
        focusout: (0, $eb2b7b7cbe4465f0$export$cc5dae9a911bfe2)
    }
});
var $74db8bbe4e0d36b4$var$buttons = new (0, $206e8296db5148b7$export$2e2bcd8739ae039)("div", {
    items: [
        {
            type: "submit",
            "class": "btn btn--save",
            title: "Save information"
        }
    ],
    attr: {
        "class": "set__btn-wrapper"
    }
});
var $74db8bbe4e0d36b4$export$2e2bcd8739ae039 = /*#__PURE__*/ function(Password) {
    "use strict";
    (0, $5e1436f3cfc25af7$export$2e2bcd8739ae039)(PasswordPage, Password);
    var _super = (0, $70223088e8354a4f$export$2e2bcd8739ae039)(PasswordPage);
    function PasswordPage() {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, PasswordPage);
        return _super.call(this, "form", {
            title: "Settings",
            inputs: $74db8bbe4e0d36b4$var$inputs,
            buttons: $74db8bbe4e0d36b4$var$buttons,
            attr: {
                "class": "form set"
            },
            events: {
                submit: function(evt) {
                    evt.preventDefault();
                    // console.log(document.querySelector('form'))
                    var formData = new FormData(document.querySelector("form"));
                    // const passwords = Object.fromEntries(formData.entries());
                    var object = {};
                    formData.forEach(function(value, key) {
                        return object[key] = value;
                    });
                    // let json = JSON.stringify(passwords);
                    if (0, $eb2b7b7cbe4465f0$export$4ce568c1357045cd) {
                        console.log(object);
                        (0, $afa20fe0f107dd50$export$2e2bcd8739ae039).password(object);
                    }
                }
            }
        });
    }
    return PasswordPage;
} // renderDom('.app', set);
((0, $72d6cf9b007b6663$export$2e2bcd8739ae039));


var $4e72b501f709fb5a$var$inputs = new (0, $62751d5f23ea729c$export$2e2bcd8739ae039)("div", {
    items: [
        {
            title: "Login",
            classInput: "input auth__input auth__input--login",
            classLabel: "label auth__label",
            name: "login",
            type: "text",
            id: "auth_login"
        },
        {
            title: "Password",
            classInput: "input auth__input auth__input--pass",
            classLabel: "label auth__label",
            name: "password",
            type: "password",
            id: "auth_pass"
        }
    ],
    attr: {
        "class": "auth__input-wrapper"
    },
    events: {
        focusin: (0, $eb2b7b7cbe4465f0$export$cc5dae9a911bfe2),
        focusout: (0, $eb2b7b7cbe4465f0$export$cc5dae9a911bfe2)
    }
});
var $4e72b501f709fb5a$var$buttons = new (0, $206e8296db5148b7$export$2e2bcd8739ae039)("div", {
    items: [
        {
            type: "submit",
            "class": "btn btn__link btn__link--submit",
            title: "Sign In"
        }
    ],
    attr: {
        "class": "auth__btn-wrapper"
    }
});
var $4e72b501f709fb5a$var$links = new (0, $c0f60909d709bd2e$export$2e2bcd8739ae039)("div", {
    items: [
        {
            url: "*/sign-up",
            title: "Registration",
            "class": "btn btn__link btn__link--reg"
        }
    ],
    attr: {
        "class": "auth__btn-wrapper"
    },
    events: {
        click: (0, $eb2b7b7cbe4465f0$export$75a0fd467e704b5c)
    }
});
var $4e72b501f709fb5a$var$Form = /*#__PURE__*/ function(Auth) {
    "use strict";
    (0, $5e1436f3cfc25af7$export$2e2bcd8739ae039)(Form, Auth);
    var _super = (0, $70223088e8354a4f$export$2e2bcd8739ae039)(Form);
    function Form() {
        (0, $d011ed1ae59d077b$export$2e2bcd8739ae039)(this, Form);
        return _super.call(this, "form", {
            title: "Authorization",
            inputs: $4e72b501f709fb5a$var$inputs,
            buttons: $4e72b501f709fb5a$var$buttons,
            links: $4e72b501f709fb5a$var$links,
            attr: {
                "class": "form auth"
            },
            events: {
                submit: function() {
                    var _ref = (0, $28fbde635bea944d$export$2e2bcd8739ae039)((0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).mark(function _callee(evt) {
                        var data, object;
                        return (0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).wrap(function _callee$(_ctx) {
                            while(1)switch(_ctx.prev = _ctx.next){
                                case 0:
                                    evt.preventDefault();
                                    console.log(evt);
                                    data = new FormData(document.querySelector("form"));
                                    object = {};
                                    data.forEach(function(value, key) {
                                        return object[key] = value;
                                    });
                                    // let json = JSON.stringify(object);
                                    if (0, $eb2b7b7cbe4465f0$export$4ce568c1357045cd) (0, $74dd2735969a6299$export$2e2bcd8739ae039).create(object).then(function() {
                                        return window.location.reload();
                                    });
                                case 6:
                                case "end":
                                    return _ctx.stop();
                            }
                        }, _callee);
                    }));
                    return function(evt) {
                        return _ref.apply(this, arguments);
                    };
                }()
            }
        });
    }
    return Form;
}((0, $a1f90209ac97a615$export$2e2bcd8739ae039));
// renderDom('.app', form);
// const createChatPage = () => {
//   return new ChatPage
// }
var $4e72b501f709fb5a$var$router = new (0, $df846e91fade512b$export$2e2bcd8739ae039)(".app");
// router
//   .use('/', Form)
//   .use('/messenger', ChatPage)
//   .use('/sign-up', RegPage)
//   .use('/settings', SetPage)
//   .start();
// console.log('here2')
document.addEventListener("DOMContentLoaded", (0, $28fbde635bea944d$export$2e2bcd8739ae039)((0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).mark(function _callee() {
    var isLogined;
    return (0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).wrap(function _callee$(_ctx) {
        while(1)switch(_ctx.prev = _ctx.next){
            case 0:
                $4e72b501f709fb5a$var$router.use("/", $4e72b501f709fb5a$var$Form).use("/messenger", (0, $bc4eab7bee14bdf6$export$2e2bcd8739ae039)).use("/sign-up", (0, $27628ae5b2c6aacf$export$2e2bcd8739ae039)).use("/settings", (0, $8f40f708c880a6d0$export$2e2bcd8739ae039)).use("/avatar", (0, $7ea42253428be078$export$2e2bcd8739ae039)).use("/user", (0, $0acda583b951d28d$export$2e2bcd8739ae039)).use("/password", (0, $74db8bbe4e0d36b4$export$2e2bcd8739ae039)).start();
                isLogined = function() {
                    var _ref = (0, $28fbde635bea944d$export$2e2bcd8739ae039)((0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).mark(function _callee() {
                        var user;
                        return (0, (/*@__PURE__*/$parcel$interopDefault($ac708654e9f9b9e1$exports))).wrap(function _callee$(_ctx) {
                            while(1)switch(_ctx.prev = _ctx.next){
                                case 0:
                                    _ctx.next = 2;
                                    return (0, $74dd2735969a6299$export$2e2bcd8739ae039).user();
                                case 2:
                                    user = _ctx.sent;
                                    return _ctx.abrupt("return", user);
                                case 4:
                                case "end":
                                    return _ctx.stop();
                            }
                        }, _callee);
                    }));
                    return function isLogined() {
                        return _ref.apply(this, arguments);
                    };
                }();
                _ctx.t0 = console;
                _ctx.next = 5;
                return isLogined();
            case 5:
                _ctx.t1 = _ctx.sent;
                _ctx.t0.log.call(_ctx.t0, _ctx.t1);
                _ctx.next = 9;
                return isLogined;
            case 9:
                _ctx.t2 = _ctx.sent;
                _ctx.t3 = undefined;
                if (!(_ctx.t2 == _ctx.t3)) {
                    _ctx.next = 15;
                    break;
                }
                $4e72b501f709fb5a$var$router.go("/");
                _ctx.next = 20;
                break;
            case 15:
                _ctx.next = 17;
                return (0, $bc4eab7bee14bdf6$export$6829d5dec06e0024)();
            case 17:
                _ctx.next = 19;
                return $4e72b501f709fb5a$var$router.go("/messenger");
            case 19:
                // const user = await isLogined();
                // console.log(user)
                // await addUserToStore(user)
                console.log((0, $535ec53cbbbf8fb5$export$2e2bcd8739ae039));
            case 20:
            case "end":
                return _ctx.stop();
        }
    }, _callee);
})));
var $4e72b501f709fb5a$export$2e2bcd8739ae039 = $4e72b501f709fb5a$var$router;


//# sourceMappingURL=index.b1f77cf7.js.map
