# Makefile à placer à la racine proto-multiout/
PROTO_DIR := schema
OUT_DIR   := build

JAVA_OUT  := java-lib/src/main/java/
TS_OUT    := ts-lib/src/
RUST_OUT  := rust-lib/src/generated/
C_OUT     := $(OUT_DIR)/c

PROTOC ?= protoc

.PHONY: all java ts c rpm clean

all: java ts rust

# --- Java (Maven) ---
java:
	@echo "----- Java lib generation -----"
	@echo "Cleaning..."
	@rm -rf $(JAVA_OUT)
	@mkdir -p $(JAVA_OUT)
	@echo "Generating sources..."
	@$(PROTOC) --java_out=$(JAVA_OUT) -I$(PROTO_DIR) $(PROTO_DIR)/*.proto
	@echo "Running maven build..."
	@( cd java-lib && mvn -q clean install )
	@echo "Java lib generated !"

# --- TypeScript / npm ---
ts:
	@echo "----- Typescript lib generation -----"
	@echo "Cleaning..."
	@rm -rf $(TS_OUT)
	@mkdir -p $(TS_OUT)
	@echo "Preparing..."
	@( cd ts-lib && npm install )
	@echo "Generating sources..."
	@$(PROTOC) --plugin=protoc-gen-es=./ts-lib/node_modules/.bin/protoc-gen-es --es_out $(TS_OUT) --es_opt target=ts -I$(PROTO_DIR) $(PROTO_DIR)/*.proto
	@echo "Running npm build..."
	@( cd ts-lib && npm run build )
	@echo "Typescript lib generated !"

# --- Rust / Cargo ---
rust:
	@echo "----- Rust lib generation -----"
	@echo "Cleaning..."
	@rm -rf $(RUST_OUT)
	@mkdir -p $(RUST_OUT)
	@echo "Generating Rust sources..."
	@$(PROTOC) --prost_out=$(RUST_OUT) -I$(PROTO_DIR) $(PROTO_DIR)/*.proto
	@echo "Running cargo build..."
	@( cd rust-lib && cargo build --release )
	@echo "Rust lib generated !"

# --- C (protobuf-c) ---
c:
	mkdir -p $(C_OUT)
	# Génère C via protoc-gen-c (fourni par protobuf-c)
	$(PROTOC) --plugin=protoc-gen-c=protoc-gen-c --c_out=$(C_OUT) -I$(PROTO_DIR) $(PROTO_DIR)/*.proto
	# build library (static)
	( cd c-lib && make PROTO_SRCDIR=$(abspath $(C_OUT)) )

# --- RPM packaging for the C library ---
rpm: c
	# Assume c-lib/Makefile produces libmylib.a and headers into c-lib/dist/
	( cd rpm && rpmbuild -bb --define "_topdir $(PWD)/rpm" mylib.spec )

clean:
	rm -rf $(OUT_DIR)/*
	( cd java-lib && mvn -q clean ) || true
	( cd ts-lib && rm -rf node_modules dist lib ) || true
	( cd rust-lib && cargo clean ) || true
	( cd c-lib && make clean ) || true
