all:
	jekyll serve --watch --config _test.yml

test:
	jekyll serve --watch --config _test.yml --destination ../_site
