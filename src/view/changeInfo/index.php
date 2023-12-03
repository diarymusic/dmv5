<?
if ($_SESSION['ls'] == 1) {
?>
    <div id="page" class="site">
        <div class="container">
            <div class="row justify-content-center align-items-center g-2">
                <div class="col-xs-8 col-sm-10 col-md-6 col-lg-6 d-none d-md-block">
                    <div class="row justify-content-start align-items-center g-2">
                        <div class="col-4 pb-4">
                            <img class="w-100 userAvatar me-3 rounded-circle">
                        </div>
                    </div>
                    <div class="row justify-content-start align-items-center g-2">
                        <div class="col-8">
                            <h4>用户名： <span class="userName me-3"></span></h4>
                        </div>
                    </div>
                    <div class="row justify-content-start align-items-center g-2">
                        <div class="col-3">
                            <h4 class="userId"></h4>
                        </div>
                    </div>
                </div>
                <div class="col-xs-8 col-sm-10 col-md-6 col-lg-6 mb-3 d-flex justify-content-between align-items-center d-md-none">
                    <div class="col-4">
                        <img class="w-100 userAvatar me-3 rounded-circle me-3" style="width: 4em!important;">
                    </div>
                    <div class="col-3">
                        <h4>用户名： <span class="userName me-3"></span></h4>
                    </div>
                    <div class="col-3">
                        <h4 class="userId"></h4>
                    </div>
                </div>
                <div class="col-xs-8 col-sm-10 col-md-6 col-lg-6">
                    <div class="login">

                        <div class="main">
                            <form>
                                <div class="side-icon">
                                    <input type="text" name="un" placeholder="新用户名" required>
                                    <i class="ri-account-box-line"></i>
                                </div>
                                <div class="side-icon">
                                    <div class="row justify-content-center align-items-center g-2 avaUpl mb-4">
                                        <div class="col-12 c10">
                                            <input class="form-control" type="file" id="fileAjax" name="fileAjax" placeholder="上传一个头像" style="height:100%" accept=".jpg,.png,.jpeg,.gif" required>
                                            <i class="ri-image-add-fill"></i>
                                        </div>
                                    </div>
                                    <div class="side-icon">
                                        <input type="password" id="psw" name="psw" placeholder="验证您的密码" autocomplete="current-password">
                                        <i class="ri-eye-off-line"></i><a href="?action=fpw">忘记密码</a>
                                    </div>
                                    <div class="side-icon">
                                    </div>
                                    <p>
                                        <input type="button" class="submit" value="修改">
                                    </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <script src="/js/src/crypt/sha256.js"></script>
    <!-- <script src="/js/src/login/login.js"></script> -->
    <script src="/js/src/changeinfo.js"></script>

    <!-- Modal Body -->
    <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
    <div class="modal fade" id="PreviewModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitleId">预览</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body d-flex justify-content-center align-items-center">
                    <img src="" alt="" class="avaImgPrv m-4">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary avatSaveBtn">Save</button>
                </div>
            </div>
        </div>
    </div>
<style>
    .avaImgPrv{
        width: 50%;
    }
</style>

<? } else { ?>
    <script>
        location.href = `?action=login&callback=${window.location.href}`;
    </script>
<? } ?>