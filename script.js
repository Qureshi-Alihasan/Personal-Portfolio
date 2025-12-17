/* ============================================================
   PORTFOLIO MAIN SCRIPT (FIXED & FINAL)
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       SHORT SELECTORS
       ========================= */
    const $ = sel => document.querySelector(sel);
    const $$ = sel => document.querySelectorAll(sel);

    console.log("Portfolio JS loaded");

    /* =========================
       CONTACT FORM
       ========================= */
    const form = $("#contactForm");
    const formStatus = $("#formStatus");

    if (form) {
        form.addEventListener("submit", async e => {
            e.preventDefault();

            const formData = {
                name: form.querySelector("input[name='name']").value,
                email: form.querySelector("input[name='email']").value,
                message: form.querySelector("textarea[name='message']").value
            };

            formStatus.textContent = "Sending...";
            formStatus.style.color = "var(--accent)";

            try {
                // ⚠️ Localhost ONLY for development
                const res = await fetch("http://localhost:5000/send", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });

                const data = await res.json();

                if (data.success) {
                    formStatus.textContent = "✔ Message Sent Successfully!";
                    formStatus.style.color = "#2ecc71";
                    form.reset();

                    setTimeout(() => {
                        formStatus.textContent = "";
                    }, 4000);
                } else {
                    throw new Error("Mail failed");
                }

            } catch (err) {
                formStatus.textContent = "❌ Something went wrong. Try again.";
                formStatus.style.color = "#ff4d4d";
                console.error("MAIL ERROR:", err);
            }
        });
    }

    /* =========================
       ACTIVE NAV ON SCROLL
       ========================= */
    const sections = $$("section[id]");
    const navLinks = $$(".site-nav a");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            if (scrollY >= section.offsetTop - 120) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

    /* =========================
       MOBILE HAMBURGER MENU ✅
       ========================= */
    const menuBtn = $(".menu-toggle");
    const nav = $(".site-nav");

    console.log("Menu button:", menuBtn);
    console.log("Nav:", nav);

    if (menuBtn && nav) {
        menuBtn.addEventListener("click", () => {
            nav.classList.toggle("open");
            console.log("Menu toggled:", nav.classList.contains("open"));
        });

        // Auto-close on link click
        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("open");
                console.log("Menu closed");
            });
        });
    }

});
