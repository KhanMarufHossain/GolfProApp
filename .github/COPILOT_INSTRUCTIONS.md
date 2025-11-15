# 📝 Copilot Integration Instructions

## Context
We are integrating the backend into a **frontend app’s codebase**.  
Dummy data currently exists in the frontend — this must be **removed and replaced with backend calls**.

## Instructions for Copilot
1. **Use Postman screenshot as reference**  
   - Treat the Postman screenshot I provide in chat as the **API contract**.  
   - Implement the frontend calls exactly as shown in the screenshot (method, endpoint, headers, body).

2. **Validate output values**  
   - Check the **output values I provide in chat** against the API response.  
   - Ensure the frontend displays or processes the backend response correctly.  
   - Compare how we call the API and how the output is structured.

3. **Backend integration workflow**  
   - Remove all **dummy data** from the codebase.  
   - Replace with **live backend calls**.  
   - Adjust frontend code structure **only if necessary** to make backend integration work.  
   - **Do not modify styling** (CSS, UI design, layout must remain untouched).

4. **Final deliverable**  
   - After backend integration is complete, generate a **list of data points**:  
     - Which backend data you successfully used in the frontend.  
     - Which backend data could be applied further in the frontend.  
   - Present this list clearly for review.

---

## Example Workflow
- Step 1: Look at Postman screenshot → identify endpoint `/api/v1/users` (GET).  
- Step 2: Replace dummy `users[]` array in frontend with `fetch('/api/v1/users')`.  
- Step 3: Validate response → ensure `id`, `name`, `email` map correctly to frontend components.  
- Step 4: Leave styling untouched.  
- Step 5: Output list:  
  - Used: `id`, `name`, `email`  
  - Could apply: `createdAt`, `role`

---

## Notes
- Copilot may restructure **logic and data flow**, but **must not touch styling**.  
- Always cross-check with **Postman screenshot** and **chat-provided output values**.  
- Deliver a **clean, backend-driven frontend** with no leftover dummy data.
