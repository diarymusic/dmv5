        <!-- ========== Start carousel ========== -->
        <!-- 轮播 -->
        <div id="demo" class="carousel slide" data-bs-ride="carousel">

            <!-- 指示符 -->
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
            </div>

            <!-- 轮播图片 -->
            <div class="carousel-inner h-100">
                <div class="carousel-item h-100 active">
                    <img decoding="async" src="/static/banner1.jpg" class="carou d-block" style="width:100%">
                    <div class="carousel-caption">
                        <!-- <h3>第一张图片描述标题</h3>
                    <p>第一张图片描述内容显示在这里！！！</p> -->
                    </div>
                </div>
                <div class="carousel-item h-100">
                    <img decoding="async" src="/static/banner2.jpg" class="carou d-block" style="width:100%">
                </div>
                <div class="carousel-item h-100">
                    <img decoding="async" src="/static/banner3.jpg" class="carou d-block" style="width:100%">
                </div>
            </div>

            <!-- 左右切换按钮 -->
            <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                <span class="carousel-control-next-icon"></span>
            </button>
        </div>
        <!-- ========== End carousel ========== -->

        <!-- ========== Start offcanvas ========== -->


        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#Id1"
            aria-controls="Id1">Enable both scrolling & backdrop</button>

        <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="Id1"
            aria-labelledby="Enable both scrolling & backdrop">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="Enable both scrolling & backdrop">Backdrop with scrolling</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <p>Try scrolling the rest of the page to see this option in action.</p>
            </div>
        </div>
        <!-- ========== End offcanvas ========== -->