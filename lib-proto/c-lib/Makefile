CC      := gcc
CFLAGS  := -Wall -Wextra -Isrc/generated -I/usr/local/include -O2
LDFLAGS := -L/usr/local/lib -lupb -lprotobuf -lpthread

SRC := src/test_person.c \
       src/generated/person.upb.c \
       src/generated/person.upbdefs.c \
       src/generated/person.upb_minitable.c

# Objets
OBJ := $(patsubst src/%.c,obj/%.o,$(filter src/%.c,$(SRC)))

# Binaire final dans bin/
TARGET := bin/test_person

.PHONY: all clean

all: $(TARGET)

# Compilation du binaire
$(TARGET): $(OBJ)
	@mkdir -p $(dir $@)
	$(CC) $(OBJ) -o $@ $(LDFLAGS)

# Compilation du test C
obj/%.o: src/%.c
	@mkdir -p $(dir $@)
	$(CC) $(CFLAGS) -c $< -o $@

# Compilation des fichiers UPB générés
obj/generated/%.o: src/generated/%.c
	@mkdir -p $(dir $@)
	$(CC) $(CFLAGS) -c $< -o $@

# Nettoyage
clean:
	rm -rf obj bin
