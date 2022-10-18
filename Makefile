build-dependencies:
	cd Backend/Golang && go mod tidy
	cd Backend/Javascript && npm i
	# cd Backend/Java/httpserver && mvn clean install