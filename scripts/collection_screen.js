class CollectionScreen {
  constructor() {
    this.init();
  }

  init() {
    this.renderSummary();
    this.renderDatasets();
  }

  bindSummaryEvents() {
    const playEl = document.getElementById("play-video");
    playEl.addEventListener("click", this.showVideoPlayer.bind(this));

    const stopEl = document.getElementById("close-player");
    stopEl.addEventListener("click", this.hideVideoPlayer.bind(this));
  }

  hideVideoPlayer() {
    const el = document.getElementById("video-player-container");
    callPlayer("ytplayer", "stopVideo");

    el.classList.remove("show");
  }

  renderSummary() {
    fetch("content/collection/summary.html")
      .then((data) => data.text())
      .then((text) => {
        const el = document.getElementById("main-content");

        el.innerHTML = text;
        this.bindSummaryEvents();
      });
  }

  renderDatasets() {
    const el = document.getElementById("section-list");

    fetch("content/collection/datasets.json")
      .then((data) => data.json())
      .then((json) => {
        const html = json
          .map((entry) =>
            this.renderDataset(
              entry.title,
              entry.source,
              entry.dialLevel,
              entry.metataDataLastUpdated,
              entry.publishingFrequency,
              entry.tags,
              entry.summary,
              entry.viewCount,
              entry.accessTime
            )
          )
          .join(" ");

        el.innerHTML = html;
      });
  }

  renderDataset(
    title,
    source,
    dialLevel,
    metataDataLastUpdated,
    publishingFrequency,
    tags,
    summary,
    viewCount,
    accessTime
  ) {
    return `<article class="section">
      <div class="two-columns">
        <div class="column-1">
          <h3>${title}</h3>
          <h4>
            <figure class="icon shield-check"></figure>
            ${source}
          </h4>
        </div>
        <div class="column-2">
          <figure class="dial" style="background-image: url(media/dial_${dialLevel}.svg)" />
        </div>
      </div>
      <div class="two-columns">
        <h5 class="column-1">
          Metadata last updated: ${metataDataLastUpdated}
          <figure class="icon more-info"></figure>
        </h5>
        <h5 class="column-2">
          Publishing frequency: ${publishingFrequency}
          <figure class="icon more-info"></figure>
        </h5>
      </div>
      <ul class="tags">
        <li class="dataset">
          <figure class="icon data-set"></figure>
          Dataset
        </li>
        ${tags.map((tag) => `<li>${tag}</li>`).join(" ")}
      </ul>
      <p>
        ${summary}
      </p>
      <div class="two-columns">
        <h6 class="column-1">
          Viewed <b>${viewCount}</b> times
        </h6>
        <h6 class="column-2">
          Typical time to access: <b>${accessTime}</b>
        </h6>
      </div>
    </article>`;
  }

  showVideoPlayer() {
    const el = document.getElementById("video-player-container");

    el.classList.add("show");
  }
}
