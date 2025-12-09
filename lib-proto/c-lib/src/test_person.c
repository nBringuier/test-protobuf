#include "person.upb.h"
#include "upb/mem/arena.h"
#include <stdio.h>

int main() {
    upb_Arena* arena = upb_Arena_New();

    myproto_Person* p = myproto_Person_new(arena);
    myproto_Person_set_name(p, upb_StringView_FromString("Alice"));
    myproto_Person_set_age(p, 30);

    printf("Name: %s\n", myproto_Person_name(p).data);
    printf("Age : %u\n", myproto_Person_age(p));

    upb_Arena_Free(arena);
    return 0;
}
