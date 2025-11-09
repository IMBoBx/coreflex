npx ts-node --project tsconfig.scripts.json .\tests\tabulateAll.test.ts


User sessions are not decreasing on booking. Maybe use get/set instead of bracket notation.
^^ or increasing when cancelling 
^^ /api/slot/:slotId


also change the caching of schema models or whatever 👍  ------- done 





TimedAlert:
- booking successful logic not working.  > done
- Same with booking fail, doesn't get error message. > giving up for now


Fix the .populate() issue > done

Check the pre-save function on User.ts -- should set start/end date properly. According to IST.

Maybe make /api/user/[userId]/GET admin only


Times are messed up - shows up as one day later/before in places -- fix that

in ProtectedRoute, if token expired, then log out

Logos. Everywhere.
Referesh sessions on admin side on create
Client package not active on start date ()