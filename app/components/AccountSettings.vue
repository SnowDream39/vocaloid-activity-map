<template>
  <div class="space-y-6">
    <!-- 账户设置 -->
    <div class="bg-surface rounded-xl shadow-sm p-6">
      <h3 class="text-lg font-semibold mb-4 flex items-center">
        <Icon name="material-symbols:settings" class="mr-2 text-primary" />
        账户设置
      </h3>
      <div class="space-y-2">
        <div 
          class="flex items-center justify-between p-3 rounded-lg hover:bg-surface-variant cursor-pointer transition-colors"
          @click="$emit('changePassword')"
        >
          <div class="flex items-center">
            <Icon name="material-symbols:password" class="mr-3 text-on-surface-variant" />
            <span>修改密码</span>
          </div>
          <Icon name="material-symbols:arrow-forward-ios" class="text-on-surface-variant text-sm" />
        </div>
        
        <div 
          class="flex items-center justify-between p-3 rounded-lg hover:bg-surface-variant cursor-pointer transition-colors"
          @click="$emit('privacySettings')"
        >
          <div class="flex items-center">
            <Icon name="material-symbols:privacy-tip" class="mr-3 text-on-surface-variant" />
            <span>隐私设置</span>
          </div>
          <Icon name="material-symbols:arrow-forward-ios" class="text-on-surface-variant text-sm" />
        </div>

        <div 
          class="flex items-center justify-between p-3 rounded-lg hover:bg-surface-variant cursor-pointer transition-colors"
          @click="$emit('notificationSettings')"
        >
          <div class="flex items-center">
            <Icon name="material-symbols:notifications" class="mr-3 text-on-surface-variant" />
            <span>通知设置</span>
          </div>
          <Icon name="material-symbols:arrow-forward-ios" class="text-on-surface-variant text-sm" />
        </div>
      </div>
    </div>

    <!-- 其他操作 -->
    <div class="bg-surface rounded-xl shadow-sm p-6">
      <h3 class="text-lg font-semibold mb-4 flex items-center">
        <Icon name="material-symbols:more-horiz" class="mr-2 text-primary" />
        其他操作
      </h3>
      <div class="space-y-2">
        <div 
          class="flex items-center justify-between p-3 rounded-lg hover:bg-surface-variant cursor-pointer transition-colors"
          @click="$emit('helpCenter')"
        >
          <div class="flex items-center">
            <Icon name="material-symbols:help" class="mr-3 text-on-surface-variant" />
            <span>帮助中心</span>
          </div>
          <Icon name="material-symbols:arrow-forward-ios" class="text-on-surface-variant text-sm" />
        </div>

        <div 
          class="flex items-center justify-between p-3 rounded-lg hover:bg-error/10 cursor-pointer transition-colors"
          @click="$emit('logout')"
        >
          <div class="flex items-center text-error">
            <Icon name="material-symbols:logout" class="mr-3" />
            <span>退出登录</span>
          </div>
          <Icon name="material-symbols:arrow-forward-ios" class="text-error/60 text-sm" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  changePassword: []
  privacySettings: []
  notificationSettings: []
  helpCenter: []
  logout: []
}>()
</script>