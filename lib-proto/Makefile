# Makefile à placer à la racine proto-multiout/
PROTO_DIR := schema
OUT_DIR   := build

JAVA_OUT  := java-lib/src/main/java/
TS_OUT    := ts-lib/src/
RUST_OUT  := rust-lib/src/generated/
C_OUT     := c-lib/src/generated

PROTOC ?= protoc

.PHONY: all java ts c rpm clean

all: java ts rust c

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
	@echo "----- C lib generation -----"
	@echo "Cleaning..."
	@rm -rf $(C_OUT)
	@mkdir -p $(C_OUT)
	@echo "Generating C sources..."
	@$(PROTOC) --upb_out=$(C_OUT) --upbdefs_out=$(C_OUT) --upb_minitable_out=$(C_OUT) -I$(PROTO_DIR) $(PROTO_DIR)/*.proto
	@echo "Testing C build..."
	@( cd c-lib && make clean && make && ./bin/test_person )

clean:
	rm -rf $(OUT_DIR)/*
	( cd java-lib && mvn -q clean ) || true
	( cd ts-lib && rm -rf node_modules dist lib ) || true
	( cd rust-lib && cargo clean ) || true
	( cd c-lib && make clean ) || true
