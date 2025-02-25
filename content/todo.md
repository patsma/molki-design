---
title: Project Progress Tracker
description: Track the progress of Molki Design website development
layout: default
pageClass: max-w-3xl mx-auto px-6 py-24 bg-white prose
---

# Molki Design - Launch Checklist

This page tracks our progress toward website completion. Last updated: {{ new Date().toLocaleDateString() }}

::progress-counter{:content="$doc.body"}
::

## 1. Content Management

- ✅ Core pages structure (Home, Projects, Services)
- 🟡 **Menu Management**
  - ✅ Menu links structure
  - ❌ Edit menu via Nuxt Studio interface
- ❌ **Footer Management**
  - ❌ Create footer as editable MD file in CMS
  - ❌ Contact info editable via Nuxt Studio
  - ❌ Social links manageable via CMS
- ✅ Copyright year automation
- ❌ **Page Management**
  - ❌ Enable adding new pages via Nuxt Studio
  - ❌ Page template for CMS-created content

## 2. Project Showcase

- ✅ Project template
- ✅ Image gallery with parallax
- ✅ Basic project filtering

## 3. SEO & Marketing

- ✅ Automatic sitemap generation
- 🟡 **SEO Final Checks**:
  - ✅ Page titles
  - ❌ Alt text for all images
  - ❌ Google Search Console verification
  - ❌ robots.txt configuration
- ❌ **Analytics Integration**
  - ❌ Google Analytics 4
  - ❌ Google Tag Manager

## 4. Legal Requirements

- ❌ Cookie consent banner (Need: Design + Text)
- ❌ Privacy Policy page (Need: Content from client)
- ❌ GDPR-compliant data handling setup

## 5. Technical Setup

- ✅ Netlify hosting ready
- 🟡 **Domain Configuration**:
  - ❌ Final A-record update
- ✅ Image optimization
- 🟡 **Custom Icons**:
  - ✅ Basic social icons
  - ❌ Custom decorative icons from design
- ❌ Favicons for all devices/browsers

## 6. Design Polish

- ✅ Core animations (smooth scroll, parallax)
- ✅ Button hover effects
- ✅ Loading screen transition
- ✅ Mobile menu animation
- ❌ **Custom Lines Animation** (From Figma design)
- ✅ Form validation messages styling

## 7. Quality Assurance

- 🟡 **Cross-browser Testing**:
  - ❌ Chrome/Firefox/Safari/Edge
  - ❌ Mobile browsers
- ❌ 404 Error page (Design needed)
- ✅ Form submission test
- ❌ Performance optimization final pass
- ❌ Spelling and grammar check

## Developer Priority List

1. Custom icons implementation
2. CMS integration for:
   - Menu links editing
   - Footer content management
   - New page creation
3. Custom line animations
4. Bug fixes
5. 404 page (pending design)

## Client Actions Needed

1. Privacy policy content
2. Cookie policy text
3. 404 page design approval
4. Final content review

## Launch Timeline

- Technical completion: 5-7 work days
- Client review period: 3 days
- Final launch: 1 day after approval

---

*Note: This page is for internal tracking only. Update items by editing the markdown file in the content directory.*
