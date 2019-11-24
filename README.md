# tm-a4-book

Web component that represents a book of A4 pages.

## Installation
```bash
npm i @wonkytech/tm-a4-book
```

## Usage
```html
<script type="module">
  import 'tm-a4-book';
</script>

<tm-a4-book>
    <tm-a4-page slot="page">
        <h2>This is a page</h2>
    </tm-a4-page>
    <tm-a4-page slot="page">
        <h2>This is another page</h2>
    </tm-a4-page>
</tm-a4-book>
```
