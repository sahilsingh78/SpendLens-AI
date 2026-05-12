# USER_INTERVIEWS.md

Three conversations with potential users, conducted May 7–9, 2026. Each around 10–15 minutes over WhatsApp call and in person. Names used with permission.

---

## Interview 1 — Sunny, SDE-1, early stage startup, Noida

**Context:** Sunny is a batchmate from Galgotias, graduated last year. Got placed at a 15-person B2B SaaS startup in Noida building HR tooling. We caught up over a call — I told him I was building something around AI tool costs and he said "bhai ye toh mujhe bhi chahiye tha."

**Direct quotes:**

> "Humari company mein Cursor Business hai sab engineers ke liye but 3 log toh sirf VS Code use karte hain. Cursor unke laptop pe pada hai. Koi cancel nahi karta kyunki process complicated lagti hai."

> "Mujhe nahi pata exactly kitna jaata hai AI tools pe. Boss ne setup kiya tha, credit card unka hai. Main toh bas use karta hoon."

> "Agar koi tool bata de exact kitna waste ho raha hai with actual number — I would forward it to my manager same day. But it has to be specific, not just 'you can save money.'"

**Most surprising thing they said:**
Sunny told me their company had GitHub Copilot Business AND Cursor Business running simultaneously for the same 4 engineers. Nobody had audited this — they just kept adding tools whenever someone requested one. That's around $236/month for 4 people just on code editors, which is genuinely insane when you think about it.

**What it changed:**
I added explicit overlap detection to the recommendation engine. If someone has both Cursor and GitHub Copilot, the engine now specifically flags this and asks them to confirm both are actively used before assuming both are justified. The reason string says "having both Cursor and Copilot for the same developers is likely redundant — verify active usage before next renewal."

---

## Interview 2 — Prince, final year CSE, Galgotias (building a side project)

**Context:** Prince is in my class. He's been building a resume parser side project for 3 months — trying to get it to a point where he can show it in interviews. Caught him in the library. He uses ChatGPT Plus and pays for it from his own pocket.

**Direct quotes:**

> "ChatGPT Plus le rakha hai $20/month ka — ghar pe bolunga toh rok denge isliye khud pay karta hoon card se. Lekin honestly kuch din toh use hi nahi karta."

> "Free wala bhi tha pehle, Plus isliye liya kyunki GPT-4 chahiye tha. But ab jo GPT-4o free mein de raha hai woh bhi same lagta hai mujhe."

> "Sach batao — agar koi bata de ki free tier se kaam chalega, main aaj cancel kar deta hoon. $20 mere liye bade hain abhi."

**Most surprising thing they said:**
Prince didn't know GPT-4o is available on the free tier now. He was paying $20/month specifically to access GPT-4 level models — and OpenAI had already made that free months ago. He was paying for something he could get for free and just didn't know. He cancelled the subscription while we were still talking.

**What it changed:**
This made me add a check in the audit engine for ChatGPT Plus users with low team size — if it's a single user doing general writing/research, the engine now surfaces "GPT-4o is now available on the free tier — verify if Plus is still necessary for your specific use case." It's not a hard recommendation but it prompts the right question.

---

## Interview 3 — Sanklap, intern at a product startup, Delhi

**Context:** Sanklap is a friend from school, currently doing a 6-month internship at a 30-person product startup in Delhi. He's on the engineering team. We talked over WhatsApp voice call for about 12 minutes.

**Direct quotes:**

> "Company ne Claude Team diya hai sab ko — $30 per seat. Hum 8 engineers hain toh $240/month. But honestly main mostly Claude free use karta hoon personally, company wala sirf office kaam ke liye."

> "Humara manager ne bola tha Anthropic API bhi use kar sakte ho projects ke liye but koi track nahi karta kitna spend ho raha hai. Last month $400 gaya API pe — kisi ko nahi pata tha."

> "Ek tool hona chahiye jo simply bata de — yeh kitna ja raha hai aur yeh sahi hai ya nahi. Abhi toh 4 alag dashboards mein jaana padta hai."

**Most surprising thing they said:**
Sanklap said their Anthropic API spend was $400 last month and nobody on the team knew. No alerts, no budget tracking, no visibility. The founder only found out when the monthly invoice came. At $400/month that's exactly the threshold where Credex credits would save them ~$140/month — but they didn't even know they were spending that much.

**What it changed:**
Two things. First — the credits recommendation now triggers at $200+ monthly API spend with more urgency in the reason string. Second — I added the benchmark card to the results page specifically because of Ayan's question "is this normal?" — now every audit shows "companies your size average $X/dev/month" so users have a reference point without having to guess.