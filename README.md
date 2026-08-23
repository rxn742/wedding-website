# Shannan & Robert — Wedding Website

A simple, static wedding website built with plain HTML/CSS/JS, ready to host for free on GitHub Pages.

## Preview locally

Just open `index.html` in a browser, or serve it locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Structure

```
index.html      – Day Guest version of the site (RSVP includes meal choice)
evening.html    – Evening Guest version of the site (RSVP has no meal choice)
css/style.css   – styling (lavender & sage theme, colors defined as CSS variables at the top)
js/script.js    – mobile nav, countdown timer, calendar link, RSVP form behaviour
wedding.ics     – downloadable calendar invite (update times once confirmed)
images/         – add your own photos here
```

### Two versions of the site

`index.html` and `evening.html` are identical except for the RSVP form: day guests get a full food selection (per guest: Starter, Main, Dessert, Dietary Restrictions, Allergies, Special Requirements), evening guests don't. Everything else (Details, Schedule, Travel, Registry, Gallery, FAQ) is the same on both pages.

The Starter and Dessert dropdown options are placeholders (`[Starter Option 1]`, etc.) — once your caterer's menu is confirmed, search `index.html` for these and replace them with the real dish names (there are four copies of each dropdown, one per possible guest — update all four). The Main, Dietary Restrictions, Allergies, and Special Requirements options are generic defaults; edit their `<option>` lists in `index.html` if you'd like different choices.

Put the relevant link on each invite:
- **Day guest invites** → `https://YOUR_USERNAME.github.io/YOUR_REPO/` (or `.../index.html`)
- **Evening guest invites** → `https://YOUR_USERNAME.github.io/YOUR_REPO/evening.html`

Since the shared sections are duplicated across both files, remember to make the same edit **twice** (once in each file) whenever you update Details, Schedule, Travel, Registry, Gallery, or FAQ. Only the RSVP section should differ between them.

Each RSVP form also includes a hidden `RSVP Type` field (`Day Guest` or `Evening Guest`) so you can tell the two apart in your Formspree inbox/dashboard even though they can share the same form ID.

## Things to customize before you publish

Search the site for anything in `[square brackets]` — these are placeholders. Key spots:

- **Event Details** (`#details`) — ceremony time, dress code
- **Schedule** (`#schedule`) — timings for the day
- **Travel & Accommodation** (`#travel`) — parking/train info, hotel recommendations
- **Registry** (`#registry`) — links to your registry/honeymoon fund
- **Gallery** (`#gallery`) — replace the placeholder tiles with `<img>` tags pointing at photos in `images/`
- **FAQ** (`#faq`) — dress code, plus-ones, kids, RSVP deadline, contact info
- **Footer** — your wedding hashtag

Once the ceremony time is confirmed, update:
- `WEDDING_START` / `WEDDING_END` in `js/script.js` (used for the countdown + Add to Calendar link)
- `DTSTART` / `DTEND` in `wedding.ics`
- The `[TBC]` text under Event Details

### Adding photos to the gallery

Drop image files into `images/`, then replace a placeholder tile in `index.html` like this:

```html
<div class="gallery-item">
  <img src="images/your-photo.jpg" alt="Description of photo" style="width:100%;height:100%;object-fit:cover;">
</div>
```

## Setting up the RSVP form (Formspree)

Both RSVP forms currently post to a **test** Formspree endpoint (`https://formspree.io/f/mkjwakvv`) so you can try the form end-to-end. Before sending real invites, swap it for your own production form:

1. Go to [formspree.io](https://formspree.io) and create a free account (if you haven't already).
2. Create a new form and copy the form ID it gives you (it'll look like `xyzabcd`).
3. In **both** `index.html` and `evening.html`, find this line inside the `<form>` tag:
   ```html
   action="https://formspree.io/f/mkjwakvv"
   ```
   and replace `mkjwakvv` with your production form's ID (the same ID works for both files — submissions land in one inbox, distinguishable by the hidden `RSVP Type` field).
4. Submit a test RSVP from each version once it's live — Formspree requires one confirmation before it starts forwarding emails to you.
5. Responses (including food choices where applicable, dietary/allergy/special requirement selections, and messages) will arrive by email and also appear in your Formspree dashboard, where you can export them as a spreadsheet.

Formspree's free tier includes 50 submissions/month, which is normally plenty for a wedding guest list — upgrade if you expect more.

## Publishing on GitHub Pages

1. Create a new repository on GitHub (e.g. `shannan-and-robert-wedding`).
2. Push this folder to it:
   ```bash
   git init
   git add .
   git commit -m "Initial wedding website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. On GitHub, go to the repo's **Settings → Pages**.
4. Under **Source**, select the `main` branch and `/ (root)` folder, then save.
5. GitHub will give you a URL like `https://YOUR_USERNAME.github.io/YOUR_REPO/` within a minute or two.

### Optional: custom domain

If you buy a domain (e.g. `shannanandrobert.com`), add a `CNAME` file to the repo root containing just the domain name, then point your domain's DNS at GitHub Pages following [GitHub's custom domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Color theme

The lavender & sage palette is defined as CSS variables at the top of `css/style.css` — tweak `--lavender`, `--sage`, and their `-deep`/`-tint` variants to adjust the look everywhere at once.
