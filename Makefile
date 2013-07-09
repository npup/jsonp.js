#!/bin/bash
DIST_DIR = ./build

JS_SRC = ${LIB} src/jsonp.js

JS_FILE = jsonp.js
JS_FILE_MIN = jsonp.min.js

JS_DIST_FILE = ${DIST_DIR}/${JS_FILE}
JS_DIST_FILE_MIN = ${DIST_DIR}/${JS_FILE_MIN}


#target: all - clean, build and minify
all: clean min

#target: dist - build
dist: ${JS_SRC}
	@cat ${JS_SRC} > ${JS_DIST_FILE}
	@echo 'target:' $@', building from:' ${JS_SRC}

#target: min - minify built file
min: dist
	@uglifyjs ${JS_DIST_FILE} > ${JS_DIST_FILE_MIN}
	@echo 'target:' $@', using uglifyjs'

#target: lint - run jshint tests
lint: dist
	@jshint --config .jshint-conf ${JS_DIST_FILE}
	@echo 'target:' $@', using jshint'

#target: clean - remove built files
clean:
		@rm -f ${DIST_DIR}/*.js
		@echo 'target:' $@

#target: help - show available targets
help:
	@echo 'Available targets:'
	@egrep "^#target:" [Mm]akefile
