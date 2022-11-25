.PHONY: build build_cloudformation build_typescript clean clean_cache clean_dist clean_modules clean_tmp deploy deployci deploy_cloudformation destroy destroy_cloudformation lint lintfix 

#### input params
debug = debug
maintenance = false
region = eu-central-1
stack = typescript-aws-lambda-serverless-restapi-kit
stage = v1
substage = sazal # x/developer-name
tests = unit
####

#### cloud params
profile = sazal-dev
stackname = ${stack}
####


#### info
help:
	@echo ""
	@echo "supported targets:"
	@echo ""
	@echo "- build: builds service. runs subtargets."
	@echo "  - build_cloudformation: builds cloudformation."
	@echo "  - build_typescript: builds typescript."
	@echo ""
	@echo "- clean: cleans service. runs subtargets."
	@echo "  - clean_cache: cleans .cache folder."
	@echo "  - clean_dist: cleans .aws-sam folder."
	@echo "  - clean_modules: cleans node_modules folder."
	@echo "  - clean_tmp: cleans .tmp folder."
	@echo ""
	@echo "- deploy: deploys service. runs build. runs subtargets."
	@echo "  - deploy_cloudformation: deploys cloudformation."
	@echo ""
	@echo "- destroy: destroys service. runs subtargets."
	@echo "  - destroy_cloudformation: destroys cloudformation."
	@echo ""
	@echo "- lint: lints service."
	@echo "- lintfix: lint fix service."
	@echo ""
####

#### validate
validate:
	@sam validate -t serverless.yml --profile sazal-dev

#### build
build: build_typescript build_cloudformation

build_cloudformation:
	@sam build -b .aws-sam/build -t serverless.yml \
		--cached \
		--cache-dir .cache \
		--parallel 

build_typescript:
	@npx --no-install tsc
####


#### clean
clean: clean_cache clean_dist clean_modules clean_tmp

clean_cache:
	@rm -rf .cache

clean_dist:
	@rm -rf .aws-sam

clean_modules:
	# @rm -rf node_modules

clean_tmp:
	@rm -rf .tmp
####


#### deploy
deploy: build deploy_cloudformation

deployci: deploy_cloudformation

deploy_cloudformation:
	@sam deploy -t .aws-sam/build/template.yaml \
    --capabilities CAPABILITY_IAM \
		--no-fail-on-empty-changeset \
    --parameter-overrides \
        DEBUG=${debug} \
        MAINTENANCE=${maintenance} \
        STACK=${stack} \
        STAGE=${stage} \
        SUBSTAGE=${substage} \
    --profile ${profile} \
    --region ${region} \
    --resolve-s3 \
    --stack-name ${stackname}
####


#### destroy
destroy: destroy_cloudformation

destroy_cloudformation:
	@sam delete \
		--no-prompts \
		--profile ${profile} \
		--region ${region} \
		--stack-name ${stackname}
####


#### lint
lint:
	@npx --no-install prettier --check '{src,__tests__}/**/*.{js,ts}'

lintfix:
	@npx --no-install prettier --write '{src,__tests__}/**/*.{js,ts}'
####
